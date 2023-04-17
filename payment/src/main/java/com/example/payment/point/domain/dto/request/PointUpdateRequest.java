package com.example.payment.point.domain.dto.request;

import lombok.Getter;

@Getter
public class PointUpdateRequest {

    private Long memberId;
    private Long point;
}
