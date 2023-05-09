package com.a509.service_member.exception;

public class EmptyValueException extends RuntimeException {
    public EmptyValueException(String message) {
        super(message);
    }

    public EmptyValueException() {
        this("값이 비어있습니다.");
    }
}
