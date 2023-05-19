package com.a509.common.kafka.config;

import com.a509.common.dto.order.request.CancelRequestDto;
import com.a509.common.dto.orderitem.request.CreateOrderItemRequestDto;
import com.a509.common.dto.orderitem.request.DeleteOrderItemRequestDto;
import com.a509.common.dto.point.request.PointUpdateRequestDto;
import com.a509.dto.CreateRequestDto;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
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
    @Value("${kafka-config.datasource}")
    private String kafkaUrl;

    @Bean
    public ProducerFactory<String, CreateRequestDto> createOrderFactory() {
        configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        configProps.put(ProducerConfig.CONNECTIONS_MAX_IDLE_MS_CONFIG, 5000); // 5초로 설정
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public ProducerFactory<String, PointUpdateRequestDto> updatePointFactory() {

        configProps = new HashMap<>();

        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        configProps.put(ProducerConfig.CONNECTIONS_MAX_IDLE_MS_CONFIG, 5000); // 5초로 설정
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public ProducerFactory<String, DeleteOrderItemRequestDto> cancelOrderFactory() {
        configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        configProps.put(ProducerConfig.CONNECTIONS_MAX_IDLE_MS_CONFIG, 5000); // 5초로 설정
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public ProducerFactory<String, CreateOrderItemRequestDto> createOrderItemFactory() {
        configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        configProps.put(ProducerConfig.CONNECTIONS_MAX_IDLE_MS_CONFIG, 5000); // 5초로 설정
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, PointUpdateRequestDto> updatePointTemplate(ProducerFactory<String, PointUpdateRequestDto> updatePointFactory) {
        return new KafkaTemplate<>(updatePointFactory);
    }

    @Bean
    public KafkaTemplate<String, CreateOrderItemRequestDto> createOrderItemTemplate(ProducerFactory<String, CreateOrderItemRequestDto> createOrderItemFactory) {
        return new KafkaTemplate<>(createOrderItemFactory);
    }

    @Bean
    public KafkaTemplate<String, DeleteOrderItemRequestDto> cancelOrderItemTemplate(ProducerFactory<String, DeleteOrderItemRequestDto> cancelOrderItemFactory){
        return new KafkaTemplate<>(cancelOrderItemFactory);
    }
}