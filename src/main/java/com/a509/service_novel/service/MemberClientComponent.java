package com.a509.service_novel.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SERVICE_MEMBER")
public interface MemberClientComponent {

	@GetMapping("/member/myPage/image/{nickName}")
	String getProfileImage(@PathVariable("nickName") String nickName);
}