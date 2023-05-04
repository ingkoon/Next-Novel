package com.a509.common.exception.point;

public class NoSuchPointException extends RuntimeException{
    public NoSuchPointException() {
        this("회원 및 포인트 정보를 불러올 수 없습니다.");
    }

    public NoSuchPointException(String message) {
        super(message);
    }
}
