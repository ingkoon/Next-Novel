package com.a509.service_member.controller;

import com.a509.service_member.dto.request.MemberLoginDto;
import com.a509.service_member.dto.request.MemberSignupDto;
import com.a509.service_member.dto.response.MemberTokenResponse;
import com.a509.service_member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member")
    public String hello() {
        return "member";
    }

    @PostMapping("/member/join")
    public ResponseEntity<Void> signUp(@RequestBody @Validated MemberSignupDto memberSignupDto) {
        memberService.signUp(memberSignupDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/member/login")
    public ResponseEntity<MemberTokenResponse> login(@RequestBody @Validated MemberLoginDto memberLoginDto) {
        System.out.println("11111111111111111111111");
        MemberTokenResponse memberTokenResponse = memberService.login(memberLoginDto);
        System.out.println("22222222222222222222222");
        return ResponseEntity.ok(memberTokenResponse);
    }


    @GetMapping("/user")
    public String userTest() {
        return "ROLE_USER TEST";
    }

    @GetMapping("/admin")
    public String adminTest() {
        return "ROLE_ADMIN TEST";
    }
}
