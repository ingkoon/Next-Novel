package com.a509.service_user.exception;

public class DuplicatedMemberException extends RuntimeException {
    public DuplicatedMemberException() {
        this("중복된 이메일입니다.");
    }
    public DuplicatedMemberException(String message) {
        super(message);
    }
}
