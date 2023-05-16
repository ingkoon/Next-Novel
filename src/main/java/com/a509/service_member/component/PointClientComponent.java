package com.a509.service_member.component;

import com.a509.service_member.dto.request.PointCreateRequestDto;
import com.a509.service_member.dto.response.PointCreateResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@FeignClient(name = "SERVICE-POINT", url = "***REMOVED***:8014/point")
public interface PointClientComponent {
    @PostMapping
    ResponseEntity<PointCreateResponseDto> createPoint(@RequestBody @Valid PointCreateRequestDto request);
}
