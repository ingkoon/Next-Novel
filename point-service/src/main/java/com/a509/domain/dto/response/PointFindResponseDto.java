package com.a509.domain.dto.response;

import com.a509.domain.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class PointFindResponseDto {
    private String nickName;
    private Long point;

    public PointFindResponseDto fromEntity(Point point){
        return PointFindResponseDto.builder()
                .nickName(point.getNickName())
                .point(point.getPoint())
                .build();
    }
}
