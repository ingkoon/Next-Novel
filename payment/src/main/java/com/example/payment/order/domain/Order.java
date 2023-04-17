package com.example.payment.order.domain;

import com.example.payment.orderitem.domain.OrderItem;
import com.example.payment.user.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
public class Order {
    @Id @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long orderNumber;

//    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int price;

    @OneToMany
    private List<OrderItem> orderItems = new ArrayList<>();

    @Builder
    public Order(Member member, int price){
        this.member = member;
        this.price = price;
    }
}
