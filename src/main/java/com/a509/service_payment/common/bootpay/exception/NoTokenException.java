package com.a509.service_payment.common.bootpay.exception;

public class NoTokenException extends RuntimeException{
    public NoTokenException() {
        this("토큰을 발급받을 수 없습니다.");
    }
    public NoTokenException(String message) {
        super(message);
    }
}
