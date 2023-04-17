package com.example.payment.common.bootpay.exception;

public class NoTokenException extends RuntimeException{
    public NoTokenException() {
        this("토큰을 발급받을 수 없습니다.");
    }

    public NoTokenException(Exception e){
        this(e.getMessage());
    }

    public NoTokenException(String message) {
        super(message);
    }
}
