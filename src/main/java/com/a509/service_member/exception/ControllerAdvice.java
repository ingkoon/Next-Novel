package com.a509.service_member.exception;

import com.a509.service_member.exception.dto.ErrorResponse;
import com.a509.service_member.exception.enums.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler({
            InvalidedAccessTokenException.class,
            EmptyValueException.class
    }) public ResponseEntity<ErrorResponse> handleInvalidException(final RuntimeException e) {
        ErrorCode errorCode = ErrorCode.BAD_REQUEST;
        ErrorResponse response = ErrorResponse.of(errorCode);
        response.setDetail(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler({
            NoSuchMemberException.class
    }) public ResponseEntity<ErrorResponse> handleNoSuchElementException(final RuntimeException e) {
        ErrorCode errorCode = ErrorCode.NOT_FOUND;
        ErrorResponse response = ErrorResponse.of(errorCode);
        response.setDetail(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler({
            DuplicatedMemberException.class
    }) public ResponseEntity<ErrorResponse> handleDuplicatedElementException(final RuntimeException e) {
        ErrorCode errorCode = ErrorCode.CONFLICT;
        ErrorResponse response = ErrorResponse.of(errorCode);
        response.setDetail(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }
}
