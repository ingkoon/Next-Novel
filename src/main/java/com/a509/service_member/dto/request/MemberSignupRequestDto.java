package com.a509.service_member.dto.request;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberSignupRequestDto {

    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
    private String email;
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;
    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickName;
    private String profileImage = "defaultProfileImg.png";

}
