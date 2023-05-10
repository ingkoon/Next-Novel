package com.a509.service;

import com.a509.common.dto.point.request.PointUpdateRequestDto;
import com.a509.common.exception.point.DuplicatedPointException;
import com.a509.common.exception.point.NoSuchPointException;
import com.a509.domain.Point;
import com.a509.domain.dto.request.PointCreateRequestDto;
import com.a509.domain.dto.request.PointDeleteRequestDto;

import com.a509.domain.dto.response.PointCreateResponseDto;
import com.a509.domain.dto.response.PointFindResponseDto;
import com.a509.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PointService {
    private final PointRepository pointRepository;

    /* feature method: 포인트를 생성한다. */
    @Transactional
    public PointCreateResponseDto createPoint(PointCreateRequestDto request){
        if(pointRepository.existsByNickName(request.getNickName())) throw new DuplicatedPointException();
        Point point = request.toEntity();
        pointRepository.save(point);

        return new PointCreateResponseDto().fromEntity(point);
    }

    /* feature method: 포인트 정보를 가져온다. */
    public PointFindResponseDto readPoint(String nickName ){
        Point point = findPoint(nickName);
        return new PointFindResponseDto()
                .fromEntity(point);
    }

    /* feature method: 포인트 정보를 갱신한다. */
    @Transactional
    public void updatePoint(PointUpdateRequestDto request){
        Point point = findPoint(request.getNickName());
        log.info("=====" + point.getNickName()+ "======");
        point.updatePoint(request.getPoint());
    }

    @Transactional
    @KafkaListener(topics = "order_item")
    public void updatePointV2(@Payload PointUpdateRequestDto request){
        log.info("===== start update point ======");
        Point point = findPoint(request.getNickName());
        log.info("=====" + point.getNickName()+ "======");
        point.updatePoint(request.getPoint());
    }
    /* feature method: 포인트 정보를 삭제한다. */
    @Transactional
    public void delete(PointDeleteRequestDto request){
        Point point = findPoint(request.getNickName());
        pointRepository.delete(point);
    }

    /* Common method: findById를 통한 Point 객체 탐색 */
    public Point findPoint(String nickName){
        return pointRepository
                .findByNickName(nickName)
                .orElseThrow(NoSuchPointException::new);
    }
}
