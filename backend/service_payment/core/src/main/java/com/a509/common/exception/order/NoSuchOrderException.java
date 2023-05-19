package com.a509.common.exception.order;

public class NoSuchOrderException extends RuntimeException{
    public NoSuchOrderException() {
        this("주문 정보를 불러올 수 없습니다.");
    }

    public NoSuchOrderException(String message) {
        super(message);
    }
}
