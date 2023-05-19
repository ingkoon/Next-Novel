package com.a509.service_novel.dto;
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
}
