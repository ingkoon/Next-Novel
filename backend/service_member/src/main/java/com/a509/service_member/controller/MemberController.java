package com.a509.service_member.controller;

import com.a509.service_member.dto.request.*;
import com.a509.service_member.dto.response.MemberTokenResponseDto;
import com.a509.service_member.dto.response.MemberMyPageResponseDto;
import com.a509.service_member.dto.response.MessageResponseDto;
import com.a509.service_member.exception.InvalidedAccessTokenException;
import com.a509.service_member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
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

    @PostMapping("/check/email")
    public ResponseEntity<MessageResponseDto> checkEmail(@RequestBody MemberSignupCheckRequestDto memberSignupCheckRequestDto) {
        MessageResponseDto response = memberService.checkEmail(memberSignupCheckRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check/nickName")
    public ResponseEntity<MessageResponseDto> checkNickName(@RequestBody MemberSignupCheckRequestDto memberSignupCheckRequestDto) {
        MessageResponseDto response = memberService.checkNickName(memberSignupCheckRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberTokenResponseDto> login(@RequestBody @Validated MemberLoginRequestDto memberLoginRequestDto) {
        MemberTokenResponseDto response = memberService.login(memberLoginRequestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/oauth2/code/google")
    public ResponseEntity<MemberTokenResponseDto> loginOauth2Google(@RequestParam("code") String code) throws IOException {
        // google 에서 설정한 redirect uri 로 요청이 들어오면 쿼리 스트링으로 들어온 code 값을 이용
        // http 통신 타서 google 회원 정보 가져오기
        String token = memberService.getTokenOauth2Google(code);

        MemberTokenResponseDto response = null;
        if(token == null) {
            throw new InvalidedAccessTokenException("다른 방법으로 로그인하세요.");
        } else {
            response = memberService.loginOauth2Google(token);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "https://***REMOVED***?accesstoken="+response.getAccessToken()+"&memberId="+response.getMemberId());
        return new ResponseEntity<>(response, headers, HttpStatus.FOUND);
    }

    @GetMapping("/oauth2/code/kakao")
    public ResponseEntity<MemberTokenResponseDto> loginOauth2Kakao(@RequestParam("code") String code) throws IOException {
        // kakao 에서 설정한 redirect uri 로 요청이 들어오면 쿼리 스트링으로 들어온 code 값을 이용
        // http 통신 타서 kakao 회원 정보 가져오기
        String token = memberService.getTokenOauth2Kakao(code);

        MemberTokenResponseDto response = null;
        if(token == null) {
            throw new InvalidedAccessTokenException("다른 방법으로 로그인하세요.");
        } else {
            response = memberService.loginOauth2Kakao(token);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "https://***REMOVED***?accesstoken="+response.getAccessToken()+"&memberId="+response.getMemberId());
        return new ResponseEntity<>(response, headers, HttpStatus.FOUND);
    }

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

    @GetMapping("/myPage/image/{memberId}")
    public String findMyPageImage(@PathVariable(value = "memberId") final String memberId) {
        return memberService.findMyPageImage(memberId);
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
        return ResponseEntity.ok().build();
    }
}
