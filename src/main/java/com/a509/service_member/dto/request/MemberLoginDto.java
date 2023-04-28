package com.a509.service_member.dto.request;

import com.a509.service_member.jpa.member.Member;
import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberLoginDto {

    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
    private String email;
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        System.out.println(email);
        System.out.println(password);
        System.out.println(getEmail());
        System.out.println(getPassword());
        return new UsernamePasswordAuthenticationToken(email, password);
    }

    public Member toEntityMember() {
        return Member.builder()
                .email(email)
                .password(password)
                .build();
    }

}
