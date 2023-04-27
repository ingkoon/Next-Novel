package com.a509.service_payment.item.enums;

public enum ItemName {
    FIFTY("fifty", 50),
    HUNDRED("hundred", 100),
    FIVE_HUNDRED("five_hundred", 500),
    THOUSAND("thousand", 1000);

    private String code;
    private int value;

    ItemName(String code, int value) {
        this.code = code;
        this.value = value;
    }
    public String getCode() {
        return code;
    }
    public int getValue() {
        return value;
    }
}
