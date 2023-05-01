package com.a509.service_payment.point.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointUpdateResponseDto {
    String message = "포인트가 정상적으로 갱신되었습니다.";

}
