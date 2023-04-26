package com.a509.service_payment.point.controller;

import com.a509.service_payment.point.domain.dto.request.PointCreateRequest;
import com.a509.service_payment.point.domain.dto.request.PointDeleteRequest;
import com.a509.service_payment.point.domain.dto.request.PointReadRequest;
import com.a509.service_payment.point.domain.dto.request.PointUpdateRequest;
import com.a509.service_payment.point.domain.dto.response.PointFindResponse;
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
    public ResponseEntity<Void> createPoint(@RequestBody PointCreateRequest request){
        pointService.createPoint(request);
        return ResponseEntity
                .ok()
                .build();
    }

    @GetMapping()
    public ResponseEntity<PointFindResponse> readPoint(PointReadRequest request){
        PointFindResponse response = pointService.readPoint(request);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PutMapping
    public ResponseEntity<Void> updatePoint(PointUpdateRequest request){
        pointService.updatePoint(request);
        return ResponseEntity
                .ok()
                .build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePoint(PointDeleteRequest request){
        pointService.delete(request);
        return ResponseEntity
                .ok()
                .build();
    }
}
