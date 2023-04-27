package com.a509.service_payment.point.domain.dto.request;

import com.a509.service_payment.point.domain.Point;
import lombok.Getter;

@Getter
public class PointCreateRequest {
    private Long userId;

    public Point toEntity(){
        return Point.builder()
                .userId(userId)
                .build();
    }
}
