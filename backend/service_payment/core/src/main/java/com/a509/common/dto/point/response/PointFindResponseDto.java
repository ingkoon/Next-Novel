package com.a509.common.dto.point.response;

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

//    public PointFindResponseDto fromEntity(Point point){
//        return PointFindResponseDto.builder()
//                .memberId(point.getMemberId())
//                .point(point.getPoint())
//                .build();
//    }
}
