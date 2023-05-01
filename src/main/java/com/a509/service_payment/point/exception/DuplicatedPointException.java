package com.a509.service_payment.point.exception;

public class DuplicatedPointException extends RuntimeException{
    public DuplicatedPointException() {
        this("중복된 회원 정보입니다.");
    }
    public DuplicatedPointException(String message) {
        super(message);
    }
}