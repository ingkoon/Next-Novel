package com.example.payment.user.controller;

import com.example.payment.user.domain.Member;
import com.example.payment.user.service.MemberService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
