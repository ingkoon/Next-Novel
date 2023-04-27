package com.a509.service_payment.order.dto;

import com.a509.service_payment.item.enums.ItemName;
import com.a509.service_payment.order.domain.Order;
import com.a509.service_payment.point.domain.Point;
import lombok.Getter;

@Getter
public class ConfirmRequest {
    private Long userId;
    private ItemName itemName;
    private Long price;
    private String receiptId;

    public Order toOrderEntity(){
        return Order.builder()
                .userId(userId)
                .price(price)
                .build();
    }
}
