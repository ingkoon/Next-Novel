package com.a509.config;

import com.a509.common.dto.order.request.IsCheckOrderRequest;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    private Map<String, Object> configProps;

    @Value("${kafka-config.datasource}")
    private String kafkaUrl;

    @Bean
    public ProducerFactory<String, IsCheckOrderRequest> successOrderFactory() {
        configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }
//    @Bean
//    public KafkaTemplate<String, IsCheckOrderRequest> successOrderTemplate(ProducerFactory<String, IsCheckOrderRequest> successOrderFactory) {
//        return new KafkaTemplate<>(successOrderFactory);
//    }
    @Bean
    public ProducerFactory<String, IsCheckOrderRequest> successOrderFactoryV2() {
        configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, IsCheckOrderRequest> successOrderTemplateV2(ProducerFactory<String, IsCheckOrderRequest> successOrderFactoryV2) {
        return new KafkaTemplate<>(successOrderFactoryV2);
    }
}