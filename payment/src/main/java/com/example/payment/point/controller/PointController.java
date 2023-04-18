package com.example.payment.point.controller;

import com.example.payment.point.domain.dto.request.PointCreateRequest;
import com.example.payment.point.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/point")
public class PointController {
    private final PointService pointService;

    @PostMapping
    public ResponseEntity<Void> createPoint(@RequestBody PointCreateRequest request){
        pointService.createPoint(request);
        return ResponseEntity
                .ok()
                .build();
    }

}
