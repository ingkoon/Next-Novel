package com.a509.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "order_item")
@NoArgsConstructor
public class OrderItem {
    @Column(name = "order_item_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private Long itemId;
    private String name;
    private Long price;
    private LocalDateTime createAt = LocalDateTime.now();

    @Builder
    public OrderItem(Long orderId, Long itemId, String name, Long price) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.name = name;
        this.price = price;
    }
}
