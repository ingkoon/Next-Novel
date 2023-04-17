package com.example.payment.user.repository;

import com.example.payment.user.domain.Member;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.ObjectAssert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;


@DataJpaTest
class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;
    @Test
    @DisplayName("멤버 생성 테스트: success")
    public void createMember(){
        //give
        Member member = new Member("디마장", "디마장", 0);
        //when
        memberRepository.save(member);
        Member findMember = memberRepository.findById(member.getId()).orElseThrow(NoSuchElementException::new);
        //then
        assertThat(member).isEqualTo(findMember);
    }

    @Test
    @DisplayName("회원 조회 테스트: success")
    public void findMember(){
        Optional<Member> member = memberRepository.findById(1L);
        assertThat(member).isNotEmpty();
        System.out.println("member = "
                + member.get().getId() + " : "
                + member.get().getName() + " : "
                + member.get().getNickname());
    }

    @Test
    @DisplayName("멤버 삭제 테스트: success")
    public void deleteMemberSuccess(){
        // give
        Member member = new Member("장지웅", "디마장", 0);

        // when
        memberRepository.save(member);
        memberRepository.delete(member);

        Optional<Member> findMember = memberRepository.findById(member.getId());

        // then
        assertThat(findMember).isEmpty();
    }

    @BeforeEach
    public void testData(){
        Member member = new Member("이인재", "이잉재", 0);
        memberRepository.save(member);
    }
}