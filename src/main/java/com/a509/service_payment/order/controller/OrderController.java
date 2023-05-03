package com.a509.service_payment.order.controller;

import com.a509.service_payment.order.dto.CreateRequestDto;
import com.a509.service_payment.order.dto.response.TokenResponseDto;
import com.a509.service_payment.order.dto.response.OrderCreateResponseDto;
import com.a509.service_payment.order.dto.response.OrderResponseDto;
import com.a509.service_payment.order.service.OrderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/payment/orders")
public class OrderController {
    private final OrderService orderService;
        @GetMapping
        public ResponseEntity<TokenResponseDto> publishToken() throws Exception {
            TokenResponseDto token = orderService.getTokenByBootPay();
            log.info("response entity value is : " + token.getToken());
            return ResponseEntity
                    .ok()
                    .body(token);
        }

        @GetMapping("/{memberId}")
        public ResponseEntity<List<OrderResponseDto>> findOrderList(
                @PathVariable("memberId") long memberId){
            List<OrderResponseDto> response = orderService.findOrders(memberId);
            return ResponseEntity
                    .ok()
                    .body(response);
        }

        @GetMapping("/{memberId}/{orderId}")
        public ResponseEntity<OrderResponseDto> findOrder(@PathVariable("memberId") long memberId, @PathVariable("orderId") long orderId) {
            OrderResponseDto response = orderService.findOrder(orderId);
            return ResponseEntity
                    .ok()
                    .body(response);
        }

        @PostMapping
        public ResponseEntity<OrderCreateResponseDto> createOrder(@RequestBody CreateRequestDto requestDto){
            orderService.createOrder(requestDto);
            OrderCreateResponseDto response = new OrderCreateResponseDto();
            return ResponseEntity
                    .ok()
                    .body(response);
        }
}
