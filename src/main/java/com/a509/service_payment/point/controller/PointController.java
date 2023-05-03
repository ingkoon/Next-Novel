package com.a509.service_payment.point.controller;

import com.a509.service_payment.point.domain.dto.request.PointCreateRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointDeleteRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointReadRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointUpdateRequestDto;
import com.a509.service_payment.point.domain.dto.response.PointCreateResponseDto;
import com.a509.service_payment.point.domain.dto.response.PointDeleteResponseDto;
import com.a509.service_payment.point.domain.dto.response.PointFindResponseDto;
import com.a509.service_payment.point.domain.dto.response.PointUpdateResponseDto;
import com.a509.service_payment.point.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/point")
public class PointController {
    private final PointService pointService;

    @PostMapping
    public ResponseEntity<PointCreateResponseDto> createPoint(@RequestBody @Valid PointCreateRequestDto request){
        PointCreateResponseDto response = pointService.createPoint(request);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @GetMapping
    public ResponseEntity<PointFindResponseDto> readPoint(@RequestParam("memberid") Long memberId){
        PointFindResponseDto response = pointService.readPoint(memberId);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PutMapping
    public ResponseEntity<PointUpdateResponseDto> updatePoint(@RequestBody PointUpdateRequestDto request){
        pointService.updatePoint(request);
        PointUpdateResponseDto response = new PointUpdateResponseDto();
        return ResponseEntity
                .ok()
                .body(response);
    }

    @DeleteMapping
    public ResponseEntity<PointDeleteResponseDto> deletePoint(@RequestBody PointDeleteRequestDto request){
        pointService.delete(request);
        PointDeleteResponseDto response = new PointDeleteResponseDto();
        return ResponseEntity
                .ok()
                .body(response);
    }
}
