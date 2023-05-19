package com.a509.service_novel.redis;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Dialog {
	private String role;
	private String content;

	@Override
	public String toString() {
		return "{" +
			"\"role\" : \"" + role + "\",\n" +
			"\"content\" : \"" + content + "\" \n" +
			'}';
	}
}
