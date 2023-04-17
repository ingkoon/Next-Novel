package com.example.payment.common.dummy;

import com.example.payment.order.domain.Order;
import com.example.payment.order.repository.OrderRepository;
import com.example.payment.user.domain.Member;
import com.example.payment.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class MemberDummy implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    @Override
    public void run(String... args) throws Exception {
        addMember();
    }
    private void addMember(){
        for (int i = 0; i < 10; i++) {
            Member member = Member.builder()
                    .name("test" + i)
                    .nickname("test" + i)
                    .point(0).build();
            memberRepository.save(member);
        }
    }

    private void addOrder(){
        Member member = memberRepository
                .findById(1L)
                .orElseThrow(NoSuchElementException::new);

        for (int i = 0; i < 2; i++) {
            Order order = Order.builder()
                    .member(member)
                    .price(1000)
                    .build();
            orderRepository.save(order);
        }
    }
}
