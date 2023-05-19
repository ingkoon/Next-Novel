package com.a509.service_member.exception;

public class InvalidedAccessTokenException extends RuntimeException {
    public InvalidedAccessTokenException(String message) {
        super(message);
    }

    public InvalidedAccessTokenException() {
        this("Access Token 정보가 유효하지 않습니다.");
    }
}
