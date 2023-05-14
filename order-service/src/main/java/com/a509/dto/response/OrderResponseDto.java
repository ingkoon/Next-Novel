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
    private Long point;
    private Long price;
    private String receiptId;

    public OrderResponseDto(Order order) {
        this.id = order.getId();
        this.price = order.getPrice();
        this.point = order.getPrice() / 10L;
        this.receiptId = order.getReceiptId();
    }

    public OrderResponseDto fromEntity(Order order){
        return OrderResponseDto.builder()
                .id(order.getId())
                .point(order.getPrice()/10L)
                .price(order.getPrice())
                .receiptId(order.getReceiptId())
                .build();
    }
}
