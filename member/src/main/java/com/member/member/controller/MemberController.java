package com.member.member.controller;

import com.member.member.domain.Member;
import com.member.member.domain.dto.CreateDto;
import com.member.member.domain.dto.DeleteDto;
import com.member.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member")
public class MemberController {
    private final MemberService memberService;
    @GetMapping
    public ResponseEntity<Void> findMember(@PathVariable("memberId") long memberId){
        Member member = memberService.findMember(memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> createMember(@RequestBody CreateDto.Request request) throws SQLException {
        memberService.saveMember(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> DeleteMember(@RequestBody DeleteDto.Request request){
        memberService.deleteMember(request);
        return ResponseEntity.ok().build();
    }
}