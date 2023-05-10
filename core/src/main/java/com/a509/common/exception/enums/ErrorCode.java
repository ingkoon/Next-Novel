package com.a509.common.exception.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode implements EnumModel {
    BAD_REQUEST(400, "BAD REQUEST", "잘못된 요청입니다."),
    INVALID(400, "INVALID", "유효하지 않은 데이터입니다."),
    INVALID_TOKEN(400 , "INVALID_TOKEN", "유효하지 않은 토큰 정보입니다."),
    CONFLICT(409, "CONFLICT", "중복된 정보가 존재합니다."),
    NOT_FOUND(404, "NOT FOUND", "자원이 유효하지 않습니다."),
    FILE_NOT_FOUND(404, "NOT FOUND", "이미지 정보가 유효하지 않습니다"),
    UNAUTHORIZED(401, "UNAUTHORIZED", "토큰 정보가 유효하지 않습니다.");

    private int status;
    private String code;
    private String message;
    private String detail;

    ErrorCode(int status, String code, String message){
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public void updateDetail(String detail){
        this.detail = detail;
    }

    @Override
    public String getKey() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.message;
    }
}
