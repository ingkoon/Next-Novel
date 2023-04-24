package com.example.servicepayment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @GetMapping("/payment")
    public String hello() {
        return "payment";
    }
}
