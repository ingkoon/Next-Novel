package com.a509.service_payment.orderitem.domain;

import com.a509.service_payment.item.domain.Item;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
    private String name;
    private Long price;

    @Builder
    public OrderItem(String name, Order order, Item item, Long price){
        this.name = name;
        this.item = item;
        this.order = order;
        this.price = price;
    }
}
