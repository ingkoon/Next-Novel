package com.a509.service_payment.point.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointUpdateRequestDto {

    private Long memberId;
    private Long point;
}
