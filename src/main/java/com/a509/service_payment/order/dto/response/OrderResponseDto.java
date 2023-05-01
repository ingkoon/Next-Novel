package com.a509.service_payment.order.dto.response;

import com.a509.service_payment.order.domain.Order;
import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private Long id;
    private Long price;
    private String receiptId;

    public OrderResponseDto(Order order) {
        this.id = order.getId();
        this.price = order.getPrice();
        this.receiptId = order.getReceiptId();
    }

    public OrderResponseDto fromEntity(Order order){
        return OrderResponseDto.builder()
                .id(order.getId())
                .price(order.getPrice())
                .receiptId(order.getReceiptId())
                .build();
    }
}
