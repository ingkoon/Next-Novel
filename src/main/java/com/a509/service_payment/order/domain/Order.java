package com.a509.service_payment.order.domain;

import com.a509.service_payment.orderitem.domain.OrderItem;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "orders")
@ToString
@NoArgsConstructor
public class Order {
    @Id @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long memberId;
    private Long price;
    private String receiptId;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = false)
    private List<OrderItem> orderItems = new ArrayList<>();
    @Builder
    public Order(Long userId, Long price, String receiptId) {
        this.memberId = userId;
        this.price = price;
        this.receiptId = receiptId;
    }
}
