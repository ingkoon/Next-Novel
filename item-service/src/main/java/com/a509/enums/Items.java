package com.a509.enums;

public enum Items {
    FIFTY("1", 500L),
    HUNDRED("2", 1000L),
    FIVE_HUNDRED("3", 5000L),
    THOUSAND("4", 10000L);

    private String key;
    private Long value;

    Items(String key, Long value) {
        this.key = key;
        this.value = value;
    }
    public String getKey() {
        return key;
    }
    public Long getValue() {
        return value;
    }
}