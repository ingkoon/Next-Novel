package com.a509.service_payment.point.service;

import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.domain.dto.request.PointCreateRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointDeleteRequestDto;
import com.a509.service_payment.point.domain.dto.request.PointUpdateRequestDto;
import com.a509.service_payment.point.domain.dto.response.PointCreateResponseDto;
import com.a509.service_payment.point.domain.dto.response.PointFindResponseDto;
import com.a509.service_payment.point.exception.DuplicatedPointException;
import com.a509.service_payment.point.exception.NoSuchPointException;
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

    /* feature method: 포인트를 생성한다. */
    @Transactional
    public PointCreateResponseDto createPoint(PointCreateRequestDto request){
        if(pointRepository.existsByMemberId(request.getMemberId())) throw new DuplicatedPointException();
        Point point = request.toEntity();
        pointRepository.save(point);

        return new PointCreateResponseDto().fromEntity(point);
    }

    /* feature method: 포인트 정보를 가져온다. */
    public PointFindResponseDto readPoint(Long memberId ){
        Point point = findPoint(memberId);
        return new PointFindResponseDto()
                .fromEntity(point);
    }

    /* feature method: 포인트 정보를 갱신한다. */
    @Transactional
    public void updatePoint(PointUpdateRequestDto request){
        Point point = findPoint(request.getMemberId());
        log.info("=====" + point.getMemberId()+ "======");
        point.updatePoint(request.getPoint());
    }

    /* feature method: 포인트 정보를 삭제한다. */
    @Transactional
    public void delete(PointDeleteRequestDto request){
        Point point = findPoint(request.getMemberId());
        pointRepository.delete(point);
    }

    /*  Common method: findById를 통한 Point 객체 탐색 */
    public Point findPoint(Long memberId){
        return pointRepository
                .findByMemberId(memberId)
                .orElseThrow(NoSuchPointException::new);
    }
}
