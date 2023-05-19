package com.a509.common.bootpay.exception;

public class InvalidReceiptException extends RuntimeException{
    public InvalidReceiptException(final String message) {
        super(message);
    }

    public InvalidReceiptException(){
        this("유효하지 않은 결제정보입니다.");
    }
}
