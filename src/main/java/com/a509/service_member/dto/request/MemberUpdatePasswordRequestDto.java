package com.a509.service_member.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class MemberUpdatePasswordRequestDto {

    private String password;
}
