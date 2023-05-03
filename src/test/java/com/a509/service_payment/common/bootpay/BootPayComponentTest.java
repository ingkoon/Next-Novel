package com.a509.service_payment.common.bootpay;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@SpringBootTest
class BootPayComponentTest {

    private final BootPayComponent bootPayComponent;

    @Test
    void connectBootPay() {
        HashMap<String, Object> map = bootPayComponent.connectBootPay();
        System.out.println(map);
    }

    @Test
    void validateOrder() throws Exception {
        HashMap<String, Object> map = bootPayComponent.validateOrder("644a307d966b740020754edc");
        System.out.println(map);
        for (Map.Entry<String, Object> entrySet : map.entrySet()) {
            System.out.println(entrySet.getKey() + " : " + entrySet.getValue());
        }
    }

    @Test
    void confirmOrder() {
    }

    @Test
    void cancelOrder() {
    }
}