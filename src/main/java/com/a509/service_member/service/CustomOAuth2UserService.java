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
            // 구글 로그인 요청
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }

        String provider = oAuth2UserInfo.getProvider(); // ex)google
        String providerId = oAuth2UserInfo.getProviderId(); // ex)134543523124
        String providerEmail = provider + "_" + providerId;
        // 해당 이메일로 이미 가입 되어있는지 확인함
        Optional<Member> optionalMember = memberRepository.findByEmail(providerEmail);

        Member member;
        if (optionalMember.isEmpty()) {
            // 해당 닉네임으로 이미 가입 되어있는지 확인함
            String nickname = oAuth2UserInfo.getNickName();
            int num = 0;
            while(memberRepository.existsByNickName(nickname)) {
                nickname = oAuth2UserInfo.getNickName()+"_"+(++num);    // ex)닉네임_0
            }

            // 회원가입 진행
            member = Member
                    .builder()
                    .email(providerEmail)
                    .password(bCryptPasswordEncoder.encode("딘추"))
                    .nickName(nickname)
                    .profileImage(oAuth2UserInfo.getProfileImage())
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            memberRepository.save(member);
        } else {
            member = optionalMember.get();
        }

        System.out.println(member.toString());
        return new CustomUserDetails(member, oAuth2User.getAttributes());
    }

//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        return super.loadUser(userRequest);
//    }
}