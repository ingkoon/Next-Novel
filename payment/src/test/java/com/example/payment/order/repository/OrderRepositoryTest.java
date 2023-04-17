package com.example.payment.order.repository;

import com.example.payment.order.domain.Order;
import com.example.payment.user.domain.Member;
import com.example.payment.user.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class OrderRepositoryTest {
    
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private OrderRepository orderRepository;
    

    @Test
    @DisplayName("주문 생성 : success")
    public void createOrder(){
        Member member = memberRepository.findById(1L).orElseThrow(NoSuchFieldError::new);

        Order order = new Order(member, 10000);
        System.out.println("order = " + order);

        orderRepository.save(order);

        assertThat(order).isNotNull();

        System.out.println("order.getId() = " + order.getId());
    }

    @BeforeEach
    public void createMember(){
        Member member = new Member("이인재", "이잉재" , 0);
        memberRepository.save(member);
    }
}