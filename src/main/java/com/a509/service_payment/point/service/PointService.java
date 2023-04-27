package com.a509.service_payment.point.service;

import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.domain.dto.request.PointCreateRequest;
import com.a509.service_payment.point.domain.dto.request.PointDeleteRequest;
import com.a509.service_payment.point.domain.dto.request.PointReadRequest;
import com.a509.service_payment.point.domain.dto.request.PointUpdateRequest;
import com.a509.service_payment.point.domain.dto.response.PointFindResponse;
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
    public void createPoint(PointCreateRequest request){
        Point point = request.toEntity();
        pointRepository.save(point);
    }

    public PointFindResponse readPoint(PointReadRequest request){
        Point point = findPoint(request.getUserId());
        return new PointFindResponse()
                .fromEntity(point);
    }

    @Transactional
    public void updatePoint(PointUpdateRequest request){
        Point point = findPoint(request.getUserId());
        point.updatePoint(request.getPoint());
    }

    @Transactional
    public void delete(PointDeleteRequest request){
        Point point = findPoint(request.getUserId());
        pointRepository.delete(point);
    }

    public Point findPoint(Long memberId){
        return pointRepository
                .findByUserId(memberId)
                .orElseThrow(NoSuchElementException::new);
    }
}
