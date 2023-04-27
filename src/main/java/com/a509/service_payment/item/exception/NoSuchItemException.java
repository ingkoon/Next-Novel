package com.a509.service_payment.item.exception;

public class NoSuchItemException extends RuntimeException{
    public NoSuchItemException() {
        this("유효하지 않은 상품명입니다");
    }

    public NoSuchItemException(String message) {
        super(message);
    }
}
