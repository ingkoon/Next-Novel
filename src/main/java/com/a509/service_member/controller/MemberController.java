package com.a509.service_member.controller;

import com.a509.service_member.dto.request.MemberSignupDto;
import com.a509.service_member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/")
    public String hello() {
        return "member";
    }

    @PostMapping("/join")
    public ResponseEntity<Void> signUp(@RequestBody @Validated MemberSignupDto memberSignupDto) {
        memberService.signUp(memberSignupDto);
        return ResponseEntity
                .ok()
                .build();
    }


}
