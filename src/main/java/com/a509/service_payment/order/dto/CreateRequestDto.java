package com.a509.service_payment.order.dto;

import com.a509.service_payment.item.enums.Items;
import com.a509.service_payment.order.domain.Order;
import lombok.Getter;

@Getter
public class CreateRequestDto {
    private Long memberId;
    private Items items;
    private String receiptId;

    public Order toOrderEntity(){
        return Order.builder()
                .userId(memberId)
                .price(items.getValue())
                .receiptId(receiptId)
                .build();
    }
}
