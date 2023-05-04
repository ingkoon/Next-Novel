package com.a509.dto.response;

import com.a509.domain.Order;
import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private Long id;
    private String receiptId;

    public OrderResponseDto(Order order) {
        this.id = order.getId();
        this.receiptId = order.getReceiptId();
    }

    public OrderResponseDto fromEntity(Order order){
        return OrderResponseDto.builder()
                .id(order.getId())
                .receiptId(order.getReceiptId())
                .build();
    }
}
