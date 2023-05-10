package com.a509.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CancelResponseDto{
    String message = "주문이 정상적으로 취소되었습니다.";
}
