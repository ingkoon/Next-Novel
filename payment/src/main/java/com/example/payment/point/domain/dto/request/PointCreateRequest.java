package com.example.payment.point.domain.dto.request;

import com.example.payment.point.domain.Point;
import lombok.Getter;

@Getter
public class PointCreateRequest {
    private Long memberId;

    public Point toEntity(){
        return Point.builder()
                .memberId(memberId)
                .build();
    }
}
