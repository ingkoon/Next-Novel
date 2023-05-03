package com.a509.service_member.service;

import com.a509.service_member.jpa.member.CustomUserDetails;
import com.a509.service_member.jpa.member.Member;
import com.a509.service_member.jpa.member.MemberRepository;
import com.a509.service_member.jpa.oauth.GoogleUserInfo;
import com.a509.service_member.jpa.oauth.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration:" + userRequest.getClientRegistration());   // registrationId로 어떤 OAuth로 로그인을 할 것인지
        System.out.println("getAccessToken:" + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("getAttributes:" + oAuth2User.getAttributes());

        // 회원가입을 강제로 진행
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }

        Optional<Member> oAuthMember = memberRepository.findByEmail(oAuth2UserInfo.getEmail());
        System.out.println("11111111111111111111111111");
        System.out.println(oAuthMember);
        Member member = null;
        if (oAuthMember == null) {
            String provider = oAuth2UserInfo.getProvider(); // google
            String providerId = oAuth2UserInfo.getProviderId();
            String email = provider + "_" + providerId;
            member = Member
                    .builder()
                    .email(email)
                    .password(bCryptPasswordEncoder.encode("딘추"))
                    .nickname(oAuth2UserInfo.getEmail())
                    .build();
            memberRepository.save(member);
            System.out.println("222222222222222");
            System.out.println(member);
        }

        return new CustomUserDetails(member, oAuth2User.getAttributes());
    }

}
