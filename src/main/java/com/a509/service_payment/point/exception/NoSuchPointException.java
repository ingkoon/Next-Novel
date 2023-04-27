package com.a509.service_payment.point.exception;

public class NoSuchPointException extends RuntimeException{
    public NoSuchPointException() {
        this("회원 및 포인트 정보를 파악할 수 없습니다.");
    }

    public NoSuchPointException(String message) {
        super(message);
    }
}
