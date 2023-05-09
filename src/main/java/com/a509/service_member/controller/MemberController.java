package com.a509.service_member.controller;

import com.a509.service_member.dto.request.*;
import com.a509.service_member.dto.response.MemberTokenResponseDto;
import com.a509.service_member.dto.response.MemberMyPageResponseDto;
import com.a509.service_member.dto.response.MessageResponseDto;
import com.a509.service_member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    String googleClientId;
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    String googleRedirecUrl;

    @GetMapping
    public String hello() {
        return "member";
    }

    @PostMapping("/join")
    public ResponseEntity<Void> signUp(@RequestBody @Validated MemberSignupRequestDto memberSignupRequestDto) {
        memberService.signUp(memberSignupRequestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/check/email")
    public ResponseEntity<MessageResponseDto> checkEmail(@RequestBody MemberSignupCheckRequestDto memberSignupCheckRequestDto) {
        MessageResponseDto response = memberService.checkEmail(memberSignupCheckRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check/nickname")
    public ResponseEntity<MessageResponseDto> checkNickname(@RequestBody MemberSignupCheckRequestDto memberSignupCheckRequestDto) {
        MessageResponseDto response = memberService.checkNickname(memberSignupCheckRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberTokenResponseDto> login(@RequestBody @Validated MemberLoginRequestDto memberLoginRequestDto) {
        MemberTokenResponseDto response = memberService.login(memberLoginRequestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/oauth/google")
    public String google() {
        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri=" + googleRedirecUrl
                + "&response_type=code&scope=email%20profile&access_type=offline";
//        + "&response_type=code&scope=email%20profile%20openid&access_type=offline";
        String test1 = "https://accounts.google.com/o/oauth2/v2/auth?" +
                "&scope=https://www.googleapis.com/auth/contacts.readonly&" +
                "access_type=offline&" +
                "include_granted_scopes=true&" +
                "response_type=code&" +
                "state=state_parameter_passthrough_value&" +
                "redirect_uri="+googleRedirecUrl+"&" +
                "client_id="+googleClientId;
        return test1;
    }

//    @GetMapping("/oauth/kakao/login")
//    public String redirectKakao(){
//        return "https://kauth.kakao.com/oauth/authorize?client_id=" + REST_API_KEY +
//                "&redirect_uri=" + redirect_uri + "&response_type=code";
//    }

//    @Hidden
//    @ResponseBody
//    @GetMapping(value = "/oauth/kakao")
//    public ResponseEntity<MemberResponse> kakaoCallback(@RequestParam String code) {
//        // 1. kakao 에서 받은 access_token을 다시 카카오만의 REDIRECT_URI 로 보내서 사용자 정보를 받음
//        String token = memberService.getKakaoToken(code);
//        List<String> account = memberService.getKakaoMember(token);

//    @GetMapping("/oauth2/authorization/google")
//    public ResponseEntity<MemberTokenResponseDto> googleCallback() {
////        MemberTokenResponseDto response = memberService.loadUser();
////        return ResponseEntity.ok(response);
//    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") final String token) {
        memberService.logout(token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/myPage")
    public ResponseEntity<MemberMyPageResponseDto> findMyPage(@RequestHeader("Authorization") final String token) {
        MemberMyPageResponseDto response = memberService.findMyPage(token);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/myPage")
    public ResponseEntity<Void> update(
            @RequestHeader("Authorization") final String token,
            @RequestPart("multipartFile") MultipartFile multipartFile,
            @RequestPart("request") @Validated MemberUpdateRequestDto memberUpdateRequestDto) {
        memberService.update(token, memberUpdateRequestDto, multipartFile);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/myPage/password")
    public ResponseEntity<Void> updatePassword(
            @RequestHeader("Authorization") final String token,
            @RequestBody MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto) {
        memberService.updatePassword(token, memberUpdatePasswordRequestDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/myPage")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") final String token) {
        memberService.delete(token);
        memberService.logout(token);
        return ResponseEntity.ok().build();
    }
}
