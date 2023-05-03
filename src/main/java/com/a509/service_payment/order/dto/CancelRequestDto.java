package com.a509.service_payment.order.dto;

import com.a509.service_payment.item.enums.Items;
import com.a509.service_payment.order.domain.Order;
import lombok.Getter;

@Getter
public class CancelRequestDto {
    private Long orderId;
    private String receiptId;
}
