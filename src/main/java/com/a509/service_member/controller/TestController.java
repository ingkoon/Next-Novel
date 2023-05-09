package com.a509.service_member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class TestController {

    @GetMapping("/user")
    public String userTest() {
        return "ROLE_USER TEST";
    }

    @GetMapping("/admin")
    public String adminTest() {
        return "ROLE_ADMIN TEST";
    }

}
