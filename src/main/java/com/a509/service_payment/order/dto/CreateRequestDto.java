package com.a509.service_payment.order.dto;

import com.a509.service_payment.item.enums.ItemName;
import com.a509.service_payment.order.domain.Order;
import lombok.Getter;

@Getter
public class CreateRequestDto {
    private Long memberId;
    private ItemName itemName;
    private Long price;
    private String receiptId;

    public Order toOrderEntity(){
        return Order.builder()
                .userId(memberId)
                .price(price)
                .build();
    }
}
