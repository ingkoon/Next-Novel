package com.a509.dto;

import lombok.Getter;

@Getter
public class CancelRequestDto {
    private Long orderId;
    private String receiptId;
}
