package com.a509.service_payment.point.domain.dto.response;

import com.a509.service_payment.point.domain.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class PointFindResponse {
    private Long memberId;
    private Long point;

    public PointFindResponse fromEntity(Point point){
        return PointFindResponse.builder()
                .memberId(point.getMemberId())
                .point(point.getPoint())
                .build();
    }
}
