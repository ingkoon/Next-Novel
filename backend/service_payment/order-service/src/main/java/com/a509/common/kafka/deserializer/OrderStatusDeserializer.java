package com.a509.common.kafka.deserializer;

import com.a509.common.enums.OrderStatus;
import org.apache.kafka.common.serialization.Deserializer;

import java.nio.charset.StandardCharsets;

public class OrderStatusDeserializer implements Deserializer {
    @Override
    public Object deserialize(String topic, byte[] data) {
        String status = new String(data, StandardCharsets.UTF_8);
        return OrderStatus.valueOf(status);
    }
}
