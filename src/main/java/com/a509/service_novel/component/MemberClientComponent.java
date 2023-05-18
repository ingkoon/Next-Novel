package com.a509.service_novel.component;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.a509.service_novel.dto.MemberMyPageResponseDto;

@FeignClient(name = "SERVICE-MEMBER", url = "***REMOVED***:8011/member")
public interface MemberClientComponent {
	@GetMapping("/myPage/image/{memberId}")
	String findMyPageImage(@PathVariable("memberId") long memberId);

	@GetMapping("/myPage")
	ResponseEntity<MemberMyPageResponseDto> findMyPage(@RequestHeader("Authorization") final String token);
}
