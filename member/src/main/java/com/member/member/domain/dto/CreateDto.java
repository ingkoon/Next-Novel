package com.member.member.domain.dto;

import com.member.member.domain.Member;
import com.member.member.enums.Grade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CreateDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request{
        private String name;
        private String nickname;
        private Grade grade;

        public Member toEntity(){
            return Member.builder()
                    .name(name)
                    .name(nickname)
                    .build();
        }
    }
}
