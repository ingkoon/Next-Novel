package com.a509.common.exception.orderitem;

public class NoSuchOrderItemException extends RuntimeException{
    public NoSuchOrderItemException() {
        this("주문 상품 정보를 확인할 수 없습니다.");
    }

    public NoSuchOrderItemException(String message) {
        super(message);
    }
}
