package com.a509.service_payment.order.dto;

import lombok.Getter;

@Getter
public class ConfirmRequest {
    private Long memberId;
    private Long point;
    private String receiptId;
}
