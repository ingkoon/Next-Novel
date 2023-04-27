package com.a509.service_payment.common.exception;

import com.a509.service_payment.common.bootpay.exception.InvalidReceiptException;
import com.a509.service_payment.common.bootpay.exception.NoTokenException;
import com.a509.service_payment.common.exception.dto.ErrorResponse;
import com.a509.service_payment.item.exception.NoSuchItemException;
import com.a509.service_payment.point.exception.NoSuchPointException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {
    @ExceptionHandler({
            NoTokenException.class,
            NoSuchItemException.class,
            NoSuchPointException.class,
    })
    public ResponseEntity<ErrorResponse> handleNoContentException(final RuntimeException e){
        ErrorResponse response = new ErrorResponse(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
    @ExceptionHandler({
            InvalidReceiptException.class
    })
    public ResponseEntity<ErrorResponse> handleInvalidException(final RuntimeException e){
        ErrorResponse response = new ErrorResponse(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}