package com.a509.service_payment.order.service;

import com.a509.service_payment.common.bootpay.BootPayComponent;
import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.exception.NoSuchItemException;
import com.a509.service_payment.item.repostiory.ItemRepository;
import com.a509.service_payment.order.domain.Order;
import com.a509.service_payment.order.dto.CreateRequestDto;
import com.a509.service_payment.order.dto.TokenResponseDto;
import com.a509.service_payment.order.repository.OrderRepository;
import com.a509.service_payment.orderitem.domain.OrderItem;
import com.a509.service_payment.orderitem.repository.OrderItemRepository;
import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.exception.NoSuchPointException;
import com.a509.service_payment.point.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;
    private final OrderItemRepository orderItemRepository;
    private final PointRepository pointRepository;
    private final BootPayComponent bootPayComponent;

    public void findByOrder(Long orderId) {
        orderRepository.findById(orderId);
    }

    public TokenResponseDto getTokenByBootPay() {
        HashMap<String, Object> hashMap = bootPayComponent.connectBootPay();
        String token = hashMap.get("access_token").toString();
        log.info("token value is : " + token);
        return new TokenResponseDto()
                .fromEntity(token);
    }

    @Transactional
    public void createOrder(CreateRequestDto request) {
        Point point =  pointRepository
                .findByMemberId(request.getMemberId())
                .orElseThrow(NoSuchPointException::new);
        point.updatePoint(request.getPrice());

        bootPayComponent.confirmOrder(request.getReceiptId());

        Order order = request.toOrderEntity();
        orderRepository.save(order);

        Item item = itemRepository.findByName(request.getItemName()).orElseThrow(NoSuchItemException::new);

        OrderItem orderItem = OrderItem
                .builder()
                .order(order)
                .item(item)
                .name(request.getItemName().getKey())
                .price(request.getPrice())
                .build();
        orderItemRepository.save(orderItem);
    }



}
