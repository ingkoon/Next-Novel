package com.a509.service_payment.order.controller;

import com.a509.service_payment.order.dto.CreateRequestDto;
import com.a509.service_payment.order.dto.TokenResponseDto;
import com.a509.service_payment.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/order")
public class OrderController {
    private final OrderService orderService;
    @GetMapping
    public ResponseEntity<TokenResponseDto> publishToken() throws Exception {
        TokenResponseDto token = orderService.getTokenByBootPay();
        log.info("response entity value is : " + token.getToken());
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Void> findOrder(@PathVariable("orderId") long orderId) {
        orderService.findByOrder(orderId);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> createOrder(@RequestBody CreateRequestDto requestDto){
        orderService.createOrder(requestDto);
        return ResponseEntity.ok().build();
    }
}
