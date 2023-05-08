package com.a509.common.dto.order.request;

import com.a509.common.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IsCheckOrderRequest {
    private Long orderId;
    private OrderStatus status;
}
