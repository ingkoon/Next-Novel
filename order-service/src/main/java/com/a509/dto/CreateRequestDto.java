package com.a509.dto;

import com.a509.domain.Order;
import lombok.Getter;

@Getter
public class CreateRequestDto {
    private Long memberId;
    private String receiptId;

    public Order toOrderEntity(){
        return Order.builder()
                .userId(memberId)
                .receiptId(receiptId)
                .build();
    }
}
