package com.a509.service_payment.point.domain.dto.request;

import com.a509.service_payment.point.domain.Point;
import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class PointCreateRequestDto {

//    @Positive
    private Long memberId;

    public Point toEntity(){
        return Point.builder()
                .memberId(memberId)
                .build();
    }
}
