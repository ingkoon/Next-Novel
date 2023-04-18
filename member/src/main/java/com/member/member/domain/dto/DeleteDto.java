package com.member.member.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class DeleteDto {

    @Getter
    @AllArgsConstructor
    public static class Request{
        private Long id;
    }
}
