package com.example.payment.order.controller;

import com.example.payment.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/order")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<String> publishToken() throws Exception {
        String token = orderService.getTokenByBootPay();
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Void> findOrder(@PathVariable("orderId") long orderId) {
        orderService.findByOrder(orderId);
        return ResponseEntity.ok().build();
    }

}
