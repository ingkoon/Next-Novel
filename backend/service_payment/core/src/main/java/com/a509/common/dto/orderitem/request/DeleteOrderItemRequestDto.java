package com.a509.common.dto.orderitem.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeleteOrderItemRequestDto {
    private Long orderId;
    private Long itemId;
    private Long price;
}
