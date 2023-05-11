package com.a509.service;

import com.a509.common.dto.order.request.IsCheckOrderRequest;
import com.a509.common.dto.orderitem.request.CreateOrderItemRequestDto;
import com.a509.common.enums.OrderStatus;
import com.a509.common.exception.orderitem.NoSuchOrderItemException;
import com.a509.domain.OrderItem;
import com.a509.dto.response.OrderItemResponseDto;
import com.a509.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final KafkaTemplate<String, IsCheckOrderRequest> successOrderTemplateV2;

    @Transactional
    @KafkaListener(topics = "create_order_item")
    public void createOrderItem(@Payload CreateOrderItemRequestDto requestDto){
        log.info("========input data========");
        OrderItem orderItem = OrderItem.builder()
                .orderId(requestDto.getOrderId())
                .itemId(requestDto.getItemId())
                .price(requestDto.getPrice())
                .build();

        orderItemRepository.save(orderItem);

        log.info("======== packaging for send data ========");
        IsCheckOrderRequest isCheckOrderRequest = IsCheckOrderRequest.builder()
                .orderId(orderItem.getOrderId())
                .status(OrderStatus.SUCCESS).build();

        log.info("======== ready to send data ========");
        successOrderTemplateV2.send("check_status", orderItem.getOrderId().toString(), isCheckOrderRequest);
    }

    public OrderItemResponseDto getOrderItem(Long oderItemId){
        OrderItem orderItem = orderItemRepository.findById(oderItemId).orElseThrow(NoSuchOrderItemException::new);
        return new OrderItemResponseDto()
                .fromEntity(orderItem);
    }

    public List<OrderItemResponseDto> getOrderItemList(Long orderId){
        List<OrderItem> orderItemList = orderItemRepository.findAllByOrderId(orderId);
        List<OrderItemResponseDto> responseList = orderItemList.stream()
                .map(OrderItemResponseDto::new).collect(Collectors.toList());
        return responseList;
    }

    @Transactional
    public void createOrderItemV2(CreateOrderItemRequestDto requestDto){
        OrderItem orderItem = OrderItem.builder()
                .orderId(requestDto.getOrderId())
                .itemId(requestDto.getItemId())
                .price(requestDto.getPrice())
                .build();
        orderItemRepository.save(orderItem);
        log.info("success save");
    }
}
