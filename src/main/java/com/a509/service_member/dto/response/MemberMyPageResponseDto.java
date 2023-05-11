package com.a509.service_member.dto.response;

import com.a509.service_member.jpa.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberMyPageResponseDto {
    private String email;
    private String nickName;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String provider;
    // 작성한 소설
    // 좋아요를 누른 소설

    public MemberMyPageResponseDto fromMeEntity(Member member) {
        return MemberMyPageResponseDto.builder()
                .email(member.getEmail())
                .nickName(member.getNickName())
                .profileImage(member.getProfileImage())
                .provider(member.getProvider())
                .createdAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                // 작성한 소설
                // 좋아요를 누른 소설
                .build();
    }

    public MemberMyPageResponseDto fromOtherEntity(Member member) {
        return MemberMyPageResponseDto.builder()
                .nickName(member.getNickName())
                .profileImage(member.getProfileImage())
                // 작성한 소설
                // 좋아요를 누른 소설
                .build();
    }
}
