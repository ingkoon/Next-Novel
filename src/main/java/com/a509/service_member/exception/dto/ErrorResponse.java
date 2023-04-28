package com.a509.service_member.exception.dto;

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

    public ErrorResponse(ErrorCode code) {
        this.code = code.getCode();
        this.status = code.getStatus();
        this.message = code.getMessage();
        this.detail = code.getDetail();
    }

    public String getMessage() {
        return message;
    }

    public static ErrorResponse of(ErrorCode code) {
        return new ErrorResponse(code);
    }
}
