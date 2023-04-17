package com.example.payment.user.service;

import com.example.payment.user.domain.Member;
import com.example.payment.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member findMember(long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(NoSuchElementException::new);
    }
}
