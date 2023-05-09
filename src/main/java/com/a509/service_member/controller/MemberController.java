package com.a509.service_member.controller;

import com.a509.service_member.dto.request.MemberLoginRequestDto;
import com.a509.service_member.dto.request.MemberSignupRequestDto;
import com.a509.service_member.dto.request.MemberUpdateRequestDto;
import com.a509.service_member.dto.response.MemberTokenResponseDto;
import com.a509.service_member.dto.response.MemberMyPageResponseDto;
import com.a509.service_member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public String hello() {
        return "member";
    }

    @PostMapping("/join")
    public ResponseEntity<Void> signUp(@RequestBody @Validated MemberSignupRequestDto memberSignupRequestDto) {
        memberService.signUp(memberSignupRequestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<MemberTokenResponseDto> login(@RequestBody @Validated MemberLoginRequestDto memberLoginRequestDto) {
        MemberTokenResponseDto response = memberService.login(memberLoginRequestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") final String token) {
        memberService.logout(token);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<MemberMyPageResponseDto> findMyPage(@RequestHeader("Authorization") final String token) {
        MemberMyPageResponseDto response = memberService.findMyPage(token);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<Void> update(
            @RequestHeader("Authorization") final String token,
            @RequestPart("multipartFile") MultipartFile multipartFile,
            @RequestPart("request") @Validated MemberUpdateRequestDto memberUpdateRequestDto) {
        memberService.update(token, memberUpdateRequestDto, multipartFile);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/delete")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") final String token) {
        memberService.delete(token);
        memberService.logout(token);
        return ResponseEntity.ok().build();
    }
}
