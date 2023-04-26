package com.a509.service_payment.common.exception.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ErrorResponse {
    private String code;
    private String message;
    private int status;
    private String detail;

    public ErrorResponse(final String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
}