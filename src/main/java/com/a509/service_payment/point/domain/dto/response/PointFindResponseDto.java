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
public class PointFindResponseDto {
    private Long memberId;
    private Long point;

    public PointFindResponseDto fromEntity(Point point){
        return PointFindResponseDto.builder()
                .memberId(point.getMemberId())
                .point(point.getPoint())
                .build();
    }
}
