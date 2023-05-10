package com.a509.common.exception.order;

public class DuplicatedOrderException extends RuntimeException{
    public DuplicatedOrderException() {
        this("중복된 주문 내역이 존재합니다.");
    }

    public DuplicatedOrderException(String message) {
        super(message);
    }
}
