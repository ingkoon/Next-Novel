package com.a509.common.dto.point.response;

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
    String message;

//    public PointCreateResponseDto fromEntity(Point point){
//        return PointCreateResponseDto
//                .builder()
//                .pointId(point.getId())
//                .message("포인트가 정상적으로 저장되었습니다.")
//                .build();
//    }
}
