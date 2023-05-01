package com.a509.service_payment.point.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PointDeleteResponseDto {
    String message = "포인트가 정상적으로 삭제되었습니다.";
}
