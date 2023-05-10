package com.a509.common.dto.order.request;

import lombok.Getter;

@Getter
public class CreateRequestDto {
    private Long memberId;
    private Long itemId;
    private Long price;
    private String receiptId;

}
