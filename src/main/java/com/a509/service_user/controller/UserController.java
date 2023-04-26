package com.a509.service_user.controller;

import com.a509.service_user.dto.UserSignupDto;
import com.a509.service_user.jpa.user.User;
import com.a509.service_user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public String hello() {
        return "user";
    }

    @PostMapping("/join")
    public ResponseEntity<?> insertUser(@RequestBody UserSignupDto userSignupDto) {
        try {
            System.out.println(userSignupDto);
            userService.insertUser(userSignupDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
