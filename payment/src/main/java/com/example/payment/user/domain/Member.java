package com.example.payment.user.domain;

import com.example.payment.order.domain.Order;
import com.example.payment.user.enums.Grade;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Member {
    @Column(name = "member_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nickname;
    private int point;
    private Grade grade = Grade.NORMAL;

    @OneToMany
    private List<Order> orders = new ArrayList<>();

    @Builder
    public Member(String name, String nickname, int point){
        this.name = name;
        this.nickname = nickname;
        this.point = point;
    }

    public void updateName(String name){
        this.name = name;
    }
    public void updateNickname(String nickname){
        this.nickname = nickname;
    }
    public void updateGrade(Grade grade){
        this.grade = grade;
    }
    public void updatePoint(int point){
        this.point = point;
    }
}
