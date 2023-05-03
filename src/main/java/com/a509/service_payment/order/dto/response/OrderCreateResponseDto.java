package com.a509.service_payment.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateResponseDto {
    String message = "주문이 정상적으로 저장되었습니다.";

}
