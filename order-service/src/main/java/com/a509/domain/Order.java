package com.a509.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


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

    @Builder
    public Order(Long userId, Long price, String receiptId) {
        this.memberId = userId;
        this.price = price;
        this.receiptId = receiptId;
    }
}
