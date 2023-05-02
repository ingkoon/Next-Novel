//package com.a509.service_payment.point;
//
//import com.a509.service_payment.point.domain.Point;
//import com.a509.service_payment.point.domain.dto.request.PointCreateRequestDto;
//import com.a509.service_payment.point.domain.dto.request.PointUpdateRequestDto;
//import com.a509.service_payment.point.domain.dto.response.PointCreateResponseDto;
//import com.a509.service_payment.point.repository.PointRepository;
//import com.a509.service_payment.point.service.PointService;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.time.LocalDateTime;
//
//
////@RequiredArgsConstructor
//@ExtendWith(MockitoExtension.class)
//public class PointServiceTest {
//
//    @InjectMocks
//    private PointService pointService;
//    @Mock
//    private PointRepository pointRepository;
//
//    @Test
//    @DisplayName("포인트 생성기능 수행")
//    public void createPointSuccess(){
//        //테스트간 연관성?
//        // 시나리오
//        PointCreateRequestDto requestDto = new PointCreateRequestDto(1L);
//        PointCreateResponseDto point = pointService.createPoint(requestDto);
//    }
//
//    @Test
//    @DisplayName("포인트 조회 기능 : Success")
//    public void readPoint(){
//        Point point = new Point(1L, 500L, 0L, LocalDateTime.now());
//        pointRepository.save(point);
//        Point findPoint  = pointService.findPoint(1L);
//        Assertions.assertEquals(findPoint.getMemberId(), 1L , "조회가 올바르게 이루어지지 않았습니다.");
//    }
//
//    @Test
//    @DisplayName("포인트 수정 기능 수행")
//    public void updatePoint(){
//        Point point = new Point(1L, 500L, 0L, LocalDateTime.now());
//        pointRepository.save(point);
//        System.out.println(point.getId());
//        PointUpdateRequestDto requestDto = new PointUpdateRequestDto(1L, 500L);
//        pointService.updatePoint(requestDto);
//    }
//
//}
