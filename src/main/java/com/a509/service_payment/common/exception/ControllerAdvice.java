package com.a509.service_payment.common.exception;

import com.a509.service_payment.common.bootpay.exception.InvalidReceiptException;
import com.a509.service_payment.common.bootpay.exception.NoTokenException;
import com.a509.service_payment.common.exception.dto.ErrorResponse;
import com.a509.service_payment.common.exception.enums.ErrorCode;
import com.a509.service_payment.item.exception.NoSuchItemException;
import com.a509.service_payment.order.exception.DuplicatedOrderException;
import com.a509.service_payment.point.exception.DuplicatedPointException;
import com.a509.service_payment.point.exception.NoSuchPointException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
        ErrorCode errorCode = ErrorCode.NOT_FOUND;
        ErrorResponse response = ErrorResponse.of(errorCode);
        response.setDetail(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
    @ExceptionHandler({
            InvalidReceiptException.class
    })
    public ResponseEntity<ErrorResponse> handleInvalidException(final RuntimeException e){
        ErrorCode errorCode = ErrorCode.INVALID;
        ErrorResponse response = new ErrorResponse(errorCode);
        response.setDetail(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler({
            DuplicatedPointException.class,
            DuplicatedOrderException.class
    })
    public ResponseEntity<ErrorResponse> handleDuplicatedException(final RuntimeException e){
        ErrorCode errorCode = ErrorCode.CONFLICT;
        ErrorResponse response = new ErrorResponse(errorCode);
        response.setDetail(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            HttpMessageNotReadableException.class
    })
    public ResponseEntity<ErrorResponse> handleNotValidException(final RuntimeException e){
        ErrorCode errorCode = ErrorCode.BAD_REQUEST;
        ErrorResponse response = new ErrorResponse(errorCode);
        response.setDetail(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
}