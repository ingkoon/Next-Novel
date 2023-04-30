package com.a509.service_member.controller;

import com.a509.service_member.dto.request.MemberLoginDto;
import com.a509.service_member.dto.request.MemberSignupDto;
import com.a509.service_member.dto.request.MemberUpdateDto;
import com.a509.service_member.dto.response.MemberTokenResponse;
import com.a509.service_member.dto.response.MypageResponse;
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
    public ResponseEntity<Void> signUp(@RequestBody @Validated MemberSignupDto memberSignupDto) {
        memberService.signUp(memberSignupDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<MemberTokenResponse> login(@RequestBody @Validated MemberLoginDto memberLoginDto) {
        MemberTokenResponse memberTokenResponse = memberService.login(memberLoginDto);
        return ResponseEntity.ok(memberTokenResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") final String token) {
        memberService.logout(token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{member-nickname}")
    public ResponseEntity<MypageResponse> findMypage(
            @RequestHeader("Authorization") final String token,
            @PathVariable("member-nickname") final String nickname) {
        MypageResponse response = memberService.findMypage(token, nickname);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<Void> update(
            @RequestHeader("Authorization") final String token,
//            @RequestPart("multipartFile") MultipartFile multipartFile,
            @RequestBody @Validated MemberUpdateDto memberUpdateDto) {
        memberService.update(token, memberUpdateDto);
//        memberService.update(token, memberUpdateDto, multipartFile);
        return ResponseEntity.ok().build();
    }

}
