package com.a509.service_payment.item.enums;

public enum ItemName {
    FIFTY("fifty", 500),
    HUNDRED("hundred", 1000),
    FIVE_HUNDRED("five_hundred", 5000),
    THOUSAND("thousand", 10000);

    private String key;
    private int value;

    ItemName(String key, int value) {
        this.key = key;
        this.value = value;
    }
    public String getKey() {
        return key;
    }
    public int getValue() {
        return value;
    }
}
