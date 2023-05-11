package com.a509.dto.response;

import com.a509.domain.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponseDto {
    private Long orderId;
    private Long itemId;
    private Long price;
    private LocalDateTime createdAt;

    public OrderItemResponseDto fromEntity(OrderItem orderItem){
        return OrderItemResponseDto
                .builder()
                .orderId(orderItem.getOrderId())
                .itemId(orderItem.getItemId())
                .price(orderItem.getPrice())
                .createdAt(orderItem.getCreatedAt())
                .build();
    }
}
