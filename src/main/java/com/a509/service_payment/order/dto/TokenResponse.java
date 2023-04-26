package com.a509.service_payment.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
    private String token;

    public TokenResponse fromEntity (String token){
        return TokenResponse
                .builder()
                .token(token)
                .build();
    }
}
