package com.a509.service;

import com.a509.common.bootpay.BootPayComponent;
import com.a509.common.dto.order.request.IsCheckOrderRequest;
import com.a509.common.dto.orderitem.request.CreateOrderItemRequestDto;
import com.a509.common.dto.point.request.PointUpdateRequestDto;

import com.a509.common.exception.order.DuplicatedOrderException;
import com.a509.common.exception.order.NoSuchOrderException;

import com.a509.domain.Order;
import com.a509.dto.CancelRequestDto;
import com.a509.dto.CreateRequestDto;
import com.a509.dto.response.OrderResponseDto;
import com.a509.dto.response.TokenResponseDto;
import com.a509.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final BootPayComponent bootPayComponent;
    private final KafkaTemplate<String, PointUpdateRequestDto> updatePointTemplate;
    private final KafkaTemplate<String, CreateOrderItemRequestDto> createOrderItemTemplate;

    /*
    feature method: findOrders
    - 주문 내역 리스트를 가져온다.
     */
    public List<OrderResponseDto> findOrders(String nickName){
        List<Order> orderList = orderRepository.findAllByNickName(nickName);
        log.info("===== list size : " + orderList.size() + "=====");
        return orderList
                .stream()
                .map(OrderResponseDto::new)
                .collect(Collectors.toList());
    }

    /*
    feature method: findOrder
    - 주문 내역 리스트를 가져온다.
     */
    public OrderResponseDto findOrder(Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(NoSuchOrderException::new);
        return new OrderResponseDto()
                .fromEntity(order);
    }

    /*
    feature method: getTokenByBootPay
    - BootPay로부터 인증받은 토큰을 가져온다.
    */
    public TokenResponseDto getTokenByBootPay() {
        HashMap<String, Object> hashMap = bootPayComponent.connectBootPay();
        log.info(hashMap.toString());
        String token = hashMap.get("access_token").toString();
        log.info("token value is : " + token);
        return new TokenResponseDto()
                .fromEntity(token);
    }

    /*
    feature method: createOrder
    PG 결제 페이지의 정보를 검증 후 이를 기반으로
    결제 정보를 DB에 저장한다.
     */
    @Transactional
    public void createOrder(CreateRequestDto requestDto) {
        if(orderRepository.existsByReceiptId(requestDto.getReceiptId()))
            throw new DuplicatedOrderException();

        bootPayComponent.confirmOrder(requestDto.getReceiptId());
        log.info("=====success confirm order=====");

        Order order = requestDto.toOrderEntity();
        orderRepository.save(order);
    }

    @Transactional
    public void createOrderV2(CreateRequestDto requestDto){
        if(orderRepository.existsByReceiptId(requestDto.getReceiptId()))
            throw new DuplicatedOrderException();
//        bootPayComponent.confirmOrder(requestDto.getReceiptId());
        log.info("=====success confirm order=====");

        Order order = requestDto.toOrderEntity();
        orderRepository.save(order);

        PointUpdateRequestDto pointUpdateRequestDto = PointUpdateRequestDto.builder()
                .nickName(order.getNickName())
                .point(order.getPrice()/10L).build();

        updatePointTemplate.send("order_item", order.getNickName().toString(), pointUpdateRequestDto);
        CreateOrderItemRequestDto orderItemRequestDto =
                CreateOrderItemRequestDto.builder()
                        .orderId(order.getId())
                        .itemId(requestDto.getItemId())
                        .price(requestDto.getPrice())
                        .build();

        log.info("=====success send to point =====");
        createOrderItemTemplate
                .send("create_order_item", orderItemRequestDto);

        log.info("=====success send to orderItem =====");
    }
    @Transactional
    @KafkaListener(topics = "check_status", containerFactory = "isCheckListenerContainerFactory")
    public void isCheckOrder(@Payload IsCheckOrderRequest requestDto) {
        Long id = requestDto.getOrderId();
        Order order = orderRepository.findById(id).orElseThrow(NoSuchOrderException::new);
        order.updateStatus(requestDto.getStatus());
    }

//    @Transactional
//    @KafkaListener(topics = "get_item")
//    public Long getItem(@Payload Long itemId){
//        return itemId;
//    }

    @Transactional
    @KafkaListener(topics = "cancel_order")
    public void cancelOrderV2(@Payload Long orderId){
        if(!orderRepository.existsById(orderId)) return;
        Order order = orderRepository.findById(orderId).orElseThrow(NoSuchOrderException::new);
        orderRepository.delete(order);
    }

    /*
    feature method: cancelOrder
    저장된 결제정보를 바탕으로 결제취소
    기능을 수행한다.
     */
    @Transactional
    public void cancelOrder(CancelRequestDto requestDto){
        Order order = orderRepository.findById(requestDto.getOrderId()).orElseThrow(NoSuchOrderException::new);
        bootPayComponent.cancelOrder(requestDto.getReceiptId());
        orderRepository.delete(order);
    }
}
