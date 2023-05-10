package com.a509.common.exception.point;

public class DuplicatedPointException extends RuntimeException{
    public DuplicatedPointException() {
        this("중복된 회원 정보입니다.");
    }
    public DuplicatedPointException(String message) {
        super(message);
    }
}