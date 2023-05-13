package com.a509.domain;

import com.a509.common.enums.OrderStatus;
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
    private String nickName;
    private Long itemId;
    private Long price;
    private String receiptId;
    @Enumerated(value = EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    @Builder
    public Order(String nickName, Long itemId, Long price, String receiptId) {
        this.nickName = nickName;
        this.itemId = itemId;
        this.price = price;
        this.receiptId = receiptId;
    }

    public void updateStatus(OrderStatus status){
        this.status = status;
    }
}
