package com.a509.service_payment.common.exception.dto;

import com.a509.service_payment.common.exception.enums.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
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
    public void setDetail(String detail){
        this.detail = detail;
    }

    public String getMessage() {
        return message;
    }
    public static ErrorResponse of(ErrorCode code){
        return new ErrorResponse(code);
    }
}