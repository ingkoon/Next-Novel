package com.a509.service_payment.item.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Item {
    @Id @Column(name="item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int price;

    private int stock;

    @Builder
    public Item(String name, int price, int stock){
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}
