package com.a509.dto;

import com.a509.domain.Order;
import lombok.Getter;

@Getter
public class CreateRequestDto {
    private Long memberId;
    private Long itemId;
    private Long price;
    private String receiptId;

    public Order toOrderEntity(){
        return Order.builder()
                .memberId(memberId)
                .price(price)
                .itemId(itemId)
                .receiptId(receiptId)
                .build();
    }
}
