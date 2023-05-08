package com.a509.service;

import com.a509.domain.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderProducerService {
    private final KafkaTemplate<Long, Order> kafkaTemplate;
    private static final String CREATE_TOPIC = "create_order_topic";

    public void sendCreateOrderItem(Order order){
        kafkaTemplate.send(CREATE_TOPIC, order.getId(), order);
    }
}
