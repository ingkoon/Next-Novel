package com.a509.service_member.dto.request;

import com.a509.service_member.jpa.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberUpdateDto {

    @NotBlank(message = "별명은 필수 입력 사항입니다.")
    private String nickname;
    private String password;
//    private String profileImage;
}
