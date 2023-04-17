package com.example.payment.order.service;

import com.example.payment.common.bootpay.BootPayComponent;
import com.example.payment.item.repostiory.ItemRepository;
import com.example.payment.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final BootPayComponent bootPayComponent;

    public void findByOrder(Long orderId){
        orderRepository.findById(orderId);
    }

    public String getTokenByBootPay() throws Exception{
        HashMap<String, Object> hashMap = bootPayComponent.connectBootPay();
        return hashMap.get("access_token").toString();
    }
    public void validateOrder(String receiptId) throws Exception {
        bootPayComponent.validateOrder(receiptId);
    }
}
