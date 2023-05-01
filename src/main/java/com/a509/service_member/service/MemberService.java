package com.a509.service_member.service;

import com.a509.service_member.dto.request.MemberLoginDto;
import com.a509.service_member.dto.request.MemberSignupDto;
import com.a509.service_member.dto.request.MemberUpdateDto;
import com.a509.service_member.dto.response.MemberTokenResponse;
import com.a509.service_member.dto.response.MypageResponse;
import com.a509.service_member.enums.MemberRole;
import com.a509.service_member.enums.MemberState;
import com.a509.service_member.exception.DuplicatedMemberException;
import com.a509.service_member.exception.InvalidedAccessTokenException;
import com.a509.service_member.exception.NoSuchMemberException;
import com.a509.service_member.jpa.FileUploader;
import com.a509.service_member.jpa.member.Member;
import com.a509.service_member.jpa.member.MemberRepository;
import com.a509.service_member.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;
    private final FileUploader fileUploader;

    public void signUp(MemberSignupDto memberSignupDto) {
        if (memberRepository.existsByEmail(memberSignupDto.getEmail())) {
            throw new DuplicatedMemberException();
        }

        if (memberRepository.existsByNickname(memberSignupDto.getNickname())) {
            throw new DuplicatedMemberException("중복된 닉네임입니다.");
        }

        Member member = memberSignupDto.toEntityMember();
        member.setState(MemberState.ACTIVE.name());
        member.setRole(MemberRole.ROLE_USER.name());
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }

    @Transactional
    public MemberTokenResponse login(MemberLoginDto memberLoginDto) {
        Member member = memberRepository.findByEmail(memberLoginDto.getEmail()).orElseThrow(NoSuchElementException::new);
        if (member.getState().equals("RESIGNED")) throw new NoSuchElementException("탈퇴한 사용자입니다.");

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginDto.toAuthentication();

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        MemberTokenResponse tokenInfo = jwtTokenProvider.generateToken(authentication, member);

        // 4. RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)
        stringRedisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return tokenInfo;
    }

    public void logout(String token) {
        String accessToken = token.split(" ")[1];

        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(accessToken)) throw new InvalidedAccessTokenException();

        // 2. Access Token 에서 Member email 을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        // 3. Redis 에서 해당 Member email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (stringRedisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            // Refresh Token 삭제
            stringRedisTemplate.delete("RT:" + authentication.getName());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        stringRedisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public MypageResponse findMypage(String token, String nickname) {
        Member member = memberRepository.findByNickname(nickname).orElseThrow(NoSuchMemberException::new);
        System.out.println(member);

        String email = jwtTokenProvider.getMember(token);
        memberRepository.findByEmail(email).orElseThrow(NoSuchMemberException::new);

        MypageResponse mypageResponse;
        if (memberRepository.existsByEmailAndNickname(email, nickname)) {
            mypageResponse = MypageResponse.builder()
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .profileImage(member.getProfileImage())
                    .createdAt(member.getCreatedAt())
                    .updatedAt(member.getUpdatedAt())
                    .provider(member.getProvider())
                    // 작성한 소설
                    // 좋아요를 누른 소설
                    .build();
        } else {
            mypageResponse = MypageResponse.builder()
                    .nickname(member.getNickname())
                    .profileImage(member.getProfileImage())
                    // 작성한 소설
                    // 좋아요를 누른 소설
                    .build();
        }
        return mypageResponse;
    }

    @Transactional
    public void update(String token, MemberUpdateDto memberUpdateDto, MultipartFile multipartFile) {
        Member member = memberRepository.findByEmail(jwtTokenProvider.getMember(token)).orElseThrow(NoSuchMemberException::new);

        String nickname = memberUpdateDto.getNickname().trim();
        if ("".equals(nickname)) {    // 닉네임 공백 체크
            throw new NoSuchMemberException("닉네임은 필수 입력 사항입니다.");
        }
        if (!member.getNickname().equals(nickname) &&
                memberRepository.existsByNickname(nickname)) { // 닉네임 중복체크
            throw new DuplicatedMemberException("중복된 닉네임입니다.");
        }
        member.setNickname(nickname);

        if (!"".equals(memberUpdateDto.getPassword()) && member.getProvider() == null) {
            member.setPassword(bCryptPasswordEncoder.encode(memberUpdateDto.getPassword()));
        }

        String imgUrl = fileUploader.upload(multipartFile, "member");
        member.setProfileImage(imgUrl);
    }
}
