package com.a509.common.kafka.config;

import com.a509.common.dto.order.request.IsCheckOrderRequest;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.ListDeserializer;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    static Map<String, Object> props;

    @Value("${kafka-config.datasource}")
    private String kafkaUrl;
    @Bean
    public ConsumerFactory<String, IsCheckOrderRequest> isCheckConsumnerFactory() {
        props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "payment-group");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(),
                new JsonDeserializer<>(IsCheckOrderRequest.class));
    }

//    @Bean
//    public ConsumerFactory<String, List<Long>> ItemConsumerFactory() {
//        props = new HashMap<>();
//        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaUrl);
//        props.put(ConsumerConfig.GROUP_ID_CONFIG, "payment-group");
//        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
//        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, CustomDeS);
//        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(),
//                new ListDeserializer());
//    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, IsCheckOrderRequest>
    isCheckListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, IsCheckOrderRequest> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(isCheckConsumnerFactory());
        return factory;
    }

//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, List<Long>>
//    getItemConsumerListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, Long> factory =
//                new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(ItemConsumerFactory());
//        return factory;
//    }
}
