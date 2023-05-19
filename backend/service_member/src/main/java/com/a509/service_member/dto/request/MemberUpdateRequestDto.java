package com.a509.service_member.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class MemberUpdateRequestDto {

    @NotBlank(message = "별명은 필수 입력 사항입니다.")
    private String nickName;
}
