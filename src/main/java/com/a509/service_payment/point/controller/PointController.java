package com.a509.service_payment.point.controller;

import com.a509.service_payment.point.domain.dto.request.PointCreateRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointDeleteRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointReadRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointUpdateRequestDto;
import com.a509.service_payment.point.domain.dto.response.PointFindResponseDto;
import com.a509.service_payment.point.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/point")
public class PointController {
    private final PointService pointService;

    @PostMapping
    public ResponseEntity<Void> createPoint(@RequestBody PointCreateRequestDto request){
        pointService.createPoint(request);
        return ResponseEntity
                .ok()
                .build();
    }

    @GetMapping()
    public ResponseEntity<PointFindResponseDto> readPoint(PointReadRequestDto request){
        PointFindResponseDto response = pointService.readPoint(request);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PutMapping
    public ResponseEntity<Void> updatePoint(PointUpdateRequestDto request){
        pointService.updatePoint(request);
        return ResponseEntity
                .ok()
                .build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePoint(PointDeleteRequestDto request){
        pointService.delete(request);
        return ResponseEntity
                .ok()
                .build();
    }
}
