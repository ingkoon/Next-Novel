package com.member.member.service;


import com.member.common.HttpConfig.HttpConnectionToPoint;
import com.member.member.domain.Member;
import com.member.member.domain.dto.CreateDto;
import com.member.member.domain.dto.DeleteDto;
import com.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final HttpConnectionToPoint httpConnectionToPoint;

    @Transactional
    public void saveMember(CreateDto.Request request) throws SQLException {
        Member member = request.toEntity();
        memberRepository.save(member);
        log.info("memberId is " + member.getId());
        boolean isSave = httpConnectionToPoint.createPoint(member.getId());
        if(!isSave) throw new SQLException();
    }

    @Transactional
    public void deleteMember(DeleteDto.Request request){
        Member member = findMember(request.getId());
        memberRepository.delete(member);
    }

    public Member findMember(long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(NoSuchElementException::new);
    }
}
