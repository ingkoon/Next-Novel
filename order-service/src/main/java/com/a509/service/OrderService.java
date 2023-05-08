package com.a509.service;

import com.a509.common.bootpay.BootPayComponent;
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
import org.springframework.kafka.core.KafkaTemplate;
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
    private final BootPayComponent bootPayComponent;
    private final KafkaTemplate<Long, CreateRequestDto> kafkaTemplate;

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
