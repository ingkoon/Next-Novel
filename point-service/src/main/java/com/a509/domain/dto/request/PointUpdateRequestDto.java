package com.a509.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointUpdateRequestDto {

    private Long memberId;
    private Long point;
}
