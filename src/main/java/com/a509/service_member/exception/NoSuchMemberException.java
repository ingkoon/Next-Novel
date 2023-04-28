package com.a509.service_member.exception;

public class NoSuchMemberException extends RuntimeException {
    public NoSuchMemberException() {
        this("사용자를 찾을 수 없습니다.");
    }
    public NoSuchMemberException(String message) {
        super(message);
    }
}
