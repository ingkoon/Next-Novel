package com.a509.service_member.service;

import com.a509.service_member.dto.request.MemberSignupDto;
import com.a509.service_member.exception.DuplicatedMemberException;
import com.a509.service_member.jpa.member.Member;
import com.a509.service_member.jpa.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void signUp(MemberSignupDto memberSignupDto) {
        if (memberRepository.existsByEmail(memberSignupDto.getEmail())) {
            throw new DuplicatedMemberException();
        }

        if (memberRepository.existsByNickname(memberSignupDto.getNickname())) {
            throw new DuplicatedMemberException("중복된 닉네임입니다.");
        }

        Member member = memberSignupDto.toEntityMember();
        member.setRole("ROLE_USER");
        String rawPassword = member.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        member.setPassword(encPassword);
        memberRepository.save(member);
    }

}
