package com.a509.service_payment.item.domain;

import com.a509.service_payment.item.enums.Items;
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
    @Enumerated(value = EnumType.STRING)
    private Items name;
    @Builder
    public Item(Items name){
        this.name = name;
    }
}