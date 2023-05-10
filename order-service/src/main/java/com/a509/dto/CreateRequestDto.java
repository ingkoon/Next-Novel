package com.a509.dto;

import com.a509.domain.Order;
import lombok.Getter;

@Getter
public class CreateRequestDto {
    private String nickName;
    private Long itemId;
    private Long price;
    private String receiptId;

    public Order toOrderEntity(){
        return Order.builder()
                .nickName(nickName)
                .price(price)
                .receiptId(receiptId)
                .build();
    }
}
