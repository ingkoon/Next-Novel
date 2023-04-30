package com.a509.service_member.exception;

public class FileStorageException extends RuntimeException{
    public FileStorageException() {
        this("파일을 저장할 수 없습니다");
    }

    public FileStorageException(String message) {
        super(message);
    }
}
