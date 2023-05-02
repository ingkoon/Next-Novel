package com.a509.service_payment.point.domain.dto.request;

import com.a509.service_payment.point.domain.Point;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
//@AllArgsConstructor
public class PointCreateRequestDto {

//    @Positive
    private Long memberId;

    public Point toEntity(){
        return Point.builder()
                .memberId(memberId)
                .build();
    }
}
