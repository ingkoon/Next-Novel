package com.a509.service_payment.point.service;

import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.domain.dto.request.PointCreateRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointDeleteRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointReadRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointUpdateRequestDto;
import com.a509.service_payment.point.domain.dto.response.PointFindResponseDto;
import com.a509.service_payment.point.repository.PointRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PointService {
    private final PointRepository pointRepository;
    @Transactional
    public void createPoint(PointCreateRequestDto request){
        Point point = request.toEntity();
        pointRepository.save(point);
    }

    public PointFindResponseDto readPoint(PointReadRequestDto request){
        Point point = findPoint(request.getMemberId());
        return new PointFindResponseDto()
                .fromEntity(point);
    }

    @Transactional
    public void updatePoint(PointUpdateRequestDto request){
        Point point = findPoint(request.getMemberId());
        point.updatePoint(request.getPoint());
    }

    @Transactional
    public void delete(PointDeleteRequestDto request){
        Point point = findPoint(request.getMemberId());
        pointRepository.delete(point);
    }

    public Point findPoint(Long memberId){
        return pointRepository
                .findByMemberId(memberId)
                .orElseThrow(NoSuchElementException::new);
    }
}
