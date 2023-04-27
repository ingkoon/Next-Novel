package com.a509.service_member.dto.request;

import com.a509.service_member.jpa.member.Member;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

//@Data
//@Builder
@Getter
public class MemberSignupDto {

    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
    private String email;
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;
    private String provider;
    private String providerId;
    private String role;

    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickname;
    private String profileImage;

    public Member toEntityMember() {
        return Member.builder()
                .email(email)
                .password(password)
                .provider(provider)
                .providerId(providerId)
                .role(role)
                .nickname(nickname)
                .profileImage(profileImage)
                .build();
    }

}
