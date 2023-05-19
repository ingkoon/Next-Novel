package com.a509.controller;

import com.a509.common.dto.orderitem.request.CreateOrderItemRequestDto;
import com.a509.dto.response.OrderItemResponseDto;
import com.a509.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orderItem")
public class OrderItemController {
    private final OrderItemService orderItemService;

    @PostMapping
    public ResponseEntity<String> saveOrderItem(@RequestBody CreateOrderItemRequestDto requestDto){
        orderItemService.createOrderItemV2(requestDto);
        return ResponseEntity
                .ok()
                .body("성공적으로 저장되었습니다.");
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderItemResponseDto>> getOrderItemList(@PathVariable("orderId") Long orderId){
        List<OrderItemResponseDto> orderItemList = orderItemService.getOrderItemList(orderId);
        return ResponseEntity
                .ok()
                .body(orderItemList);
    }

    @GetMapping("/{orderId}/{orderItemId}")
    public ResponseEntity<OrderItemResponseDto> getOrderItem(
            @PathVariable("orderId") Long orderId,
            @PathVariable("orderItemId") Long orderItemId){
        OrderItemResponseDto response = orderItemService.getOrderItem(orderItemId);
        return ResponseEntity
                .ok()
                .body(response);
    }
}
