package com.a509.service_user.controller;

import com.a509.service_user.dto.request.UserSignupRequest;
import com.a509.service_user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public String hello() {
        return "user";
    }

    @PostMapping("/join")
    public ResponseEntity<Void> insertUser(@RequestBody @Validated UserSignupRequest request) {
        userService.insertUser(request);
        return ResponseEntity
                .ok()
                .build();
    }


}
