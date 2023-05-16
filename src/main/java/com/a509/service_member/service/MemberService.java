package com.a509.service_member.service;

import com.a509.service_member.component.MemberImageComponent;
import com.a509.service_member.dto.request.*;
import com.a509.service_member.dto.response.MemberTokenResponseDto;
import com.a509.service_member.dto.response.MemberMyPageResponseDto;
import com.a509.service_member.dto.response.MessageResponseDto;
import com.a509.service_member.enums.MemberState;
import com.a509.service_member.exception.DuplicatedMemberException;
import com.a509.service_member.exception.EmptyValueException;
import com.a509.service_member.exception.NoSuchMemberException;
import com.a509.service_member.jpa.member.Member;
import com.a509.service_member.jpa.member.MemberRepository;
import com.a509.service_member.jwt.JwtTokenProvider;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;
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
    private final MemberImageComponent memberImageComponent;
    private final WebClient webClient = WebClient.create();
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    String googleClientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    String googleClientSecret;
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    String googleRedirectUrl;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    String kakaoClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.redirectUri}")
    String kakaoRedirectUrl;
    @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
    String grantType;


    public Member findMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(NoSuchMemberException::new);
    }

    @Transactional
    public void signUp(MemberSignupRequestDto memberSignupRequestDto) {
        if (memberRepository.existsByEmail(memberSignupRequestDto.getEmail())) {
            throw new DuplicatedMemberException();
        }

        if (memberRepository.existsByNickName(memberSignupRequestDto.getNickName())) {
            throw new DuplicatedMemberException("중복된 닉네임입니다.");
        }

        Member member = Member
                .builder()
                .email(memberSignupRequestDto.getEmail())
                .password(bCryptPasswordEncoder.encode(memberSignupRequestDto.getPassword()))
                .nickName(memberSignupRequestDto.getNickName())
                .profileImage(memberSignupRequestDto.getProfileImage())
                .build();
        memberRepository.save(member);

        try {
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public MessageResponseDto checkEmail(MemberSignupCheckRequestDto memberSignupCheckRequestDto) {
        String res = "";
        String msg = "";
        if (memberRepository.existsByEmail(memberSignupCheckRequestDto.getEmail())) {
            res = "fail";
            msg = "중복된 이메일입니다.";
        } else {
            res = "success";
            msg = "사용 가능한 이메일입니다.";
        }
        MessageResponseDto message = MessageResponseDto.builder()
                .result(res)
                .message(msg)
                .build();
        return message;
    }

    public MessageResponseDto checkNickName(MemberSignupCheckRequestDto memberSignupCheckRequestDto) {
        String res = "";
        String msg = "";
        if (memberRepository.existsByNickName(memberSignupCheckRequestDto.getNickName())) {
            res = "fail";
            msg = "중복된 닉네임입니다.";
        } else {
            res = "success";
            msg = "사용 가능한 닉네임입니다.";
        }
        MessageResponseDto message = MessageResponseDto.builder()
                .result(res)
                .message(msg)
                .build();
        return message;
    }

    @Transactional
    public MemberTokenResponseDto login(MemberLoginRequestDto memberLoginRequestDto) {
        Member member = findMember(memberLoginRequestDto.getEmail());
        if (member.getState().equals(MemberState.RESIGNED.name())) throw new NoSuchMemberException("탈퇴한 사용자입니다.");

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginRequestDto.toAuthentication();

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        MemberTokenResponseDto tokenInfo = jwtTokenProvider.generateToken(authentication, member);

        // 4. RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)
        // "RT:{AccessToken}" : "{RefreshToken}"
        stringRedisTemplate.opsForValue()
                .set("RT:" + tokenInfo.getAccessToken(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return tokenInfo;
    }

    public String getTokenOauth2Google(String code) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("code", code);
        body.add("client_id", googleClientId);
        body.add("client_secret", googleClientSecret);
        body.add("redirect_uri", googleRedirectUrl);
        body.add("grant_type", grantType);
        Map<String, Object> responseBody = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("oauth2.googleapis.com")
                        .path("/token")
                        .build())
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();

        return (String) responseBody.get("id_token");
    }

    public String getTokenOauth2Kakao(String code) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("grant_type", grantType);
        body.add("client_id", kakaoClientId);
        body.add("redirect_uri", kakaoRedirectUrl);
        body.add("code", code);
        Map<String, Object> responseBody = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("kauth.kakao.com")
                        .path("/oauth/token")
                        .build())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();

        return (String) responseBody.get("access_token");
    }

    public MemberTokenResponseDto loginOauth2Google(String token) {
        // JWT token 의 payload 값 decode
        String[] jwtParts = token.split("\\.");
        byte[] bytes = Base64.getDecoder().decode((jwtParts[1]));
        String payload = new String(bytes, StandardCharsets.UTF_8);

        // String 형태를 json 형태로 변환 후 정보 추출
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(payload, JsonObject.class);

        // Member 생성 후 로그인 진행
        String subValue = jsonObject.get("sub").getAsString();
        String emailValue = jsonObject.get("email").getAsString();
        String nameValue = "";
        String pictureValue = "";
        try {
            nameValue = jsonObject.get("name").getAsString();
            pictureValue = jsonObject.get("picture").getAsString();
        } catch (Exception e) {
            nameValue = emailValue;
            pictureValue = "defaultProfileImg.png";
        }

        return oauth2Login("google", subValue, emailValue, nameValue, pictureValue);
    }

    public MemberTokenResponseDto loginOauth2Kakao(String token) {
        Map<String, Object> responseBody = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("kapi.kakao.com")
                        .path("/v2/user/me")
                        .build())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();

        String subValue = responseBody.get("id").toString();
        Map<String, Object> kakaoAcount = (Map<String, Object>) responseBody.get("kakao_account");
        String emailValue = kakaoAcount.get("email").toString();
        Map<String, Object> profile = (Map<String, Object>) kakaoAcount.get("profile");
        String nameValue = profile.get("nickname").toString();
        String pictureValue = profile.get("profile_image_url").toString();

        return oauth2Login("kakao", subValue, emailValue, nameValue, pictureValue);
    }

    public MemberTokenResponseDto oauth2Login(String provider, String subValue, String emailValue, String nameValue, String pictureValue) {
        // 다음 형태의 이메일로 이미 가입 되어있는지 확인
        String email = provider+"@"+emailValue;   // ex)google@ejk9658@gmail.com
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        Member member;
        if (optionalMember.isEmpty()) {
            // 해당 닉네임으로 이미 가입 되어있는지 확인함
            int num = 0;
            String name = nameValue;
            while(memberRepository.existsByNickName(name)) {
                name = nameValue+"_"+(++num);    // ex)닉네임_1
            }

            // 회원가입 진행
            member = Member
                    .builder()
                    .email(email)
                    .password(bCryptPasswordEncoder.encode("딘추"))
                    .nickName(name)
                    .profileImage(pictureValue)
                    .provider(provider)
                    .providerId(subValue)
                    .build();
            memberRepository.save(member);
        } else {
            member = optionalMember.get();
        }

        MemberLoginRequestDto loginDto = new MemberLoginRequestDto();
        loginDto.setEmail(member.getEmail());
        loginDto.setPassword("딘추");

        return login(loginDto);
    }

    public void logout(String token) {
        updateRedisItems(token, "logout");
    }

    public MemberMyPageResponseDto findMyPage(String token) {
        Member member = findMember(jwtTokenProvider.getMember(token));
        return new MemberMyPageResponseDto().fromMeEntity(member);
    }

    public String findMyPageImage(String nickName) {
        Optional<Member> member = memberRepository.findByNickName(nickName);
        if(member.isPresent()) {
            return member.get().getProfileImage();
        } else {
            return "defaultProfileImg.png";
        }
    }

    @Transactional
    public void update(String token, MemberUpdateRequestDto memberUpdateRequestDto, MultipartFile multipartFile) {
        Member member = findMember(jwtTokenProvider.getMember(token));

        String nickName = memberUpdateRequestDto.getNickName().trim();
        if ("".equals(nickName)) {    // 닉네임 공백 체크
            throw new NoSuchMemberException("닉네임은 필수 입력 사항입니다.");
        }
        if (!member.getNickName().equals(nickName) &&
                memberRepository.existsByNickName(nickName)) { // 닉네임 중복체크
            throw new DuplicatedMemberException("중복된 닉네임입니다.");
        }
        member.setNickName(nickName);

        if(!multipartFile.isEmpty()) {
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss");
            String UID = now.format(formatter);
            try{
                memberImageComponent.save(multipartFile,UID);
                member.setProfileImage(UID+"_"+multipartFile.getOriginalFilename());
            }
            catch(Exception e) {
                throw new RuntimeException();
            }
        }
    }

    @Transactional
    public void updatePassword(String token, MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto) {
        Member member = findMember(jwtTokenProvider.getMember(token));

        String password = memberUpdatePasswordRequestDto.getPassword().trim();
        if("".equals(password)) {
            throw new EmptyValueException("변경할 비밀번호를 입력해주세요.");
        }
        if (member.getProvider() == null) {
            member.setPassword(bCryptPasswordEncoder.encode(password));
        }
    }

    @Transactional
    public void delete(String token) {
        Member member = findMember(jwtTokenProvider.getMember(token));
        member.setState(MemberState.RESIGNED.name());

        updateRedisItems(token, "resign");
    }

    @Transactional
    public void updateRedisItems(String token, String status) {
        String accessToken = token.split(" ")[1];

        // 1. Redis Access Token 으로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        // "RT:{AccessToken}" : "{RefreshToken}"
        if (stringRedisTemplate.opsForValue().get("RT:" + accessToken) != null) {
            // Refresh Token 삭제
            stringRedisTemplate.delete("RT:" + accessToken);
        }

        // 2. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        stringRedisTemplate.opsForValue().set(accessToken, status, expiration, TimeUnit.MILLISECONDS);
    }
}
