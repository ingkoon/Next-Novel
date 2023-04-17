package com.example.payment.order.service;

import com.example.payment.common.bootpay.BootPayComponent;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;

@SpringBootTest
class OrderServiceTest {
    @Autowired
    private BootPayComponent bootPayComponent;
    @Value("${boot-pay.rest-api-key}")
    private String restApiKey;
    @Value("${boot-pay.private-key}")
    private String privateKey;

    @Test
    @DisplayName("BootPay 토큰 값 가져오기")
    void getTokenByBootPay() throws Exception{
        System.out.println(restApiKey);
        System.out.println(privateKey);
        HashMap<String, Object> hashMap = bootPayComponent.connectBootPay();
        System.out.println(hashMap.size());

    }
}