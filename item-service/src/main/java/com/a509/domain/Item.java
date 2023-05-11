package com.a509.domain;


import com.a509.enums.Items;
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
    private Long point;
    private Long price;

    @Builder
    public Item(Items name, Long point, Long price) {
        this.name = name;
        this.point = point;
        this.price = price;
    }
}