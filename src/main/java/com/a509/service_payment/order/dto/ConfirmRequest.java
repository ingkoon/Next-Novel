package com.a509.service_payment.order.dto;

import lombok.Getter;

@Getter
public class ConfirmRequest {
    private Long memberId;
    private Long point;
    private Long price;
    private String receiptId;
}
