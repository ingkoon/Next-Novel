package com.a509.service;

import com.a509.common.dto.order.request.IsCheckOrderRequest;
import com.a509.common.dto.orderitem.request.CreateOrderItemRequestDto;
import com.a509.common.enums.OrderStatus;
import com.a509.domain.OrderItem;
import com.a509.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final KafkaTemplate<String, IsCheckOrderRequest> successOrderTemplate;

    @Transactional
    @KafkaListener(topics = "create_order_item")
    public void createOrderItem(@Payload CreateOrderItemRequestDto requestDto){
        OrderItem orderItem = OrderItem.builder()
                .orderId(requestDto.getOrderId())
                .itemId(requestDto.getItemId())
                .price(requestDto.getPrice())
                .build();

        orderItemRepository.save(orderItem);
        IsCheckOrderRequest isCheckOrderRequest = IsCheckOrderRequest.builder()
                .orderId(orderItem.getOrderId())
                .status(OrderStatus.SUCCESS).build();

        successOrderTemplate.send("check_status", orderItem.getOrderId().toString(), isCheckOrderRequest);
    }
}
