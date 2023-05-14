package com.a509.controller;

import com.a509.common.dto.point.request.PointUpdateRequestDto;
import com.a509.domain.dto.request.PointCreateRequestDto;
import com.a509.domain.dto.request.PointDeleteRequestDto;
import com.a509.domain.dto.response.PointCreateResponseDto;
import com.a509.domain.dto.response.PointDeleteResponseDto;
import com.a509.domain.dto.response.PointFindResponseDto;
import com.a509.domain.dto.response.PointUpdateResponseDto;
import com.a509.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<PointFindResponseDto> readPoint(@RequestParam("nickName") String nickName){
        PointFindResponseDto response = pointService.readPoint(nickName);
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PatchMapping
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

    @PostMapping("/test")
    public ResponseEntity<PointUpdateResponseDto> updatePointV2(@RequestBody PointUpdateRequestDto request){
        pointService.updatePoint(request);
        PointUpdateResponseDto response = new PointUpdateResponseDto();
        return ResponseEntity
                .ok()
                .body(response);
    }

    @PutMapping("/test")
    public ResponseEntity<PointUpdateResponseDto> updatePointV3(@RequestBody PointUpdateRequestDto request){
        pointService.updatePoint(request);
        PointUpdateResponseDto response = new PointUpdateResponseDto();
        return ResponseEntity
                .ok()
                .body(response);
    }
}
