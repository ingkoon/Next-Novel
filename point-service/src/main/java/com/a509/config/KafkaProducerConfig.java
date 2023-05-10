package com.a509.config;

import com.a509.common.dto.orderitem.request.CreateOrderItemRequestDto;
import com.a509.common.dto.point.request.PointUpdateRequestDto;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    private Map<String, Object> configProps;

//    @Bean
//    public ProducerFactory<String, CreateRequestDto> createOrderFactory() {
//        configProps = new HashMap<>();
//        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//        return new DefaultKafkaProducerFactory<>(configProps);
//    }
//    @Bean
//    public KafkaTemplate<String, PointUpdateRequestDto> updatePointTemplate(ProducerFactory<String, PointUpdateRequestDto> updatePointFactory) {
//        return new KafkaTemplate<>(updatePointFactory);
//    }
}