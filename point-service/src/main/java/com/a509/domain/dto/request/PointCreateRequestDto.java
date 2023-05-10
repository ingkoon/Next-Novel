package com.a509.domain.dto.request;

import com.a509.domain.Point;
import lombok.Getter;

@Getter
//@AllArgsConstructor
public class PointCreateRequestDto {

//    @Positive
    private String nickName;

    public Point toEntity(){
        return Point.builder()
                .nickName(nickName)
                .build();
    }
}
