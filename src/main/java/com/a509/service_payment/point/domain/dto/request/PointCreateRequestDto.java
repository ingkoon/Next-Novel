package com.a509.service_payment.point.domain.dto.request;

import com.a509.service_payment.point.domain.Point;
import lombok.Getter;

@Getter
public class PointCreateRequestDto {
    private Long memberId;

    public Point toEntity(){
        return Point.builder()
                .memberId(memberId)
                .build();
    }
}
