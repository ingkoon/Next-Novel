package com.a509.service_payment.order.dto.response;

import com.a509.service_payment.order.domain.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private Long id;
    private Long price;
    private String receiptId;

    public OrderResponseDto fromEntity(Order order){
        return OrderResponseDto.builder()
                .id(order.getId())
                .price(order.getPrice())
                .receiptId(order.getReceiptId())
                .build();
    }

}
