package com.a509.service_payment.common.bootpay;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.swing.*;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BootPayComponentTest {
    @Autowired
    private BootPayComponent bootPayComponent;

    @Test
    void connectBootPay() {
        HashMap<String, Object> map = bootPayComponent.connectBootPay();
        System.out.println(map);
    }

    @Test
    void validateOrder() throws Exception {
        HashMap<String, Object> map = bootPayComponent.validateOrder("644a307d966b740020754edc");
        System.out.println(map);
    }

    @Test
    void confirmOrder() {
    }

    @Test
    void cancelOrder() {
    }
}