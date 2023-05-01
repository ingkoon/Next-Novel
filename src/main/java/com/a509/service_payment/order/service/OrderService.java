package com.a509.service_payment.order.service;

import com.a509.service_payment.common.bootpay.BootPayComponent;
import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.exception.NoSuchItemException;
import com.a509.service_payment.item.repostiory.ItemRepository;
import com.a509.service_payment.order.domain.Order;
import com.a509.service_payment.order.dto.CreateRequestDto;
import com.a509.service_payment.order.dto.TokenResponseDto;
import com.a509.service_payment.order.dto.response.OrderResponseDto;
import com.a509.service_payment.order.exception.DuplicatedOrderException;
import com.a509.service_payment.order.repository.OrderRepository;
import com.a509.service_payment.orderitem.domain.OrderItem;
import com.a509.service_payment.orderitem.repository.OrderItemRepository;
import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.exception.DuplicatedPointException;
import com.a509.service_payment.point.exception.NoSuchPointException;
import com.a509.service_payment.point.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;
    private final OrderItemRepository orderItemRepository;
    private final PointRepository pointRepository;
    private final BootPayComponent bootPayComponent;

    /*
    feature method: findOrders
    - 주문 내역 리스트를 가져온다.
     */
    public List<OrderResponseDto> findOrders(Long memberId){
        List<Order> orderList = orderRepository.findAllByMemberId(memberId);
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
        Order order = orderRepository.findById(orderId).orElseThrow(NoSuchItemException::new);
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

        Point point =  pointRepository
                .findByMemberId(requestDto.getMemberId())
                .orElseThrow(NoSuchPointException::new);
        log.info("=====success get point information=====");

        point.updatePoint(requestDto.getItems().getValue());

        Order order = requestDto.toOrderEntity();
        orderRepository.save(order);
        log.info("=====success create order=====");
        Item item = itemRepository.findByName(requestDto.getItems()).orElseThrow(NoSuchItemException::new);
        log.info("=====success get item=====");
        OrderItem orderItem = OrderItem
                .builder()
                .order(order)
                .item(item)
                .name(requestDto.getItems().getKey())
                .price(requestDto.getItems().getValue())
                .build();
        orderItemRepository.save(orderItem);
        log.info("=====success to save orderItem=====");
    }
}
