package com.example.servicenovel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NovelController {

    @GetMapping("/novel")
    public String hello() {
        return "novel";
    }
}
