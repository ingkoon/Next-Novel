package com.a509.service_payment.orderitem.domain;

import com.a509.service_payment.order.domain.Order;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class OrderItem {
    @Column(name = "order_item_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    private String name;
    private String cost;

    @Builder
    public OrderItem(String name, Order order, String cost){
        this.name = name;
        this.order = order;
        this.cost = cost;
    }
}
