package com.a509.service_payment.point.domain.dto.response;

import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.domain.dto.request.PointCreateRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointCreateResponseDto {

    Long pointId;
    String message = "포인트가 정상적으로 저장되었습니다.";

    public PointCreateResponseDto fromEntity(Point point){
        return PointCreateResponseDto
                .builder()
                .pointId(point.getId())
                .build();
    }
}
