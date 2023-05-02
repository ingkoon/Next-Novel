//package com.a509.service_payment.point;
//
//import com.a509.service_payment.point.domain.Point;
//import com.a509.service_payment.point.repository.PointRepository;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.util.Optional;
//
//@DataJpaTest
//public class PointRepositoryTest {
//    @Autowired
//    private PointRepository pointRepository;
//
//    @Test
//    @DisplayName("포인트 정보 생성: success")
//    public void createPoint(){
//        Point point = Point.builder()
//                .memberId(2L)
//                .build();
//        pointRepository.save(point);
//        System.out.println("create success");
//    }
//
//    @Test
//    @DisplayName("포인트 정보 갱신: Fail")
//    public void updatePointFail(){
//        Optional<Point> point = pointRepository.findById(3L);
//        if(point.isPresent()){
//            Point realPoint = point.get();
//            realPoint.updatePoint(5000L);
//            System.out.println("realPoint = " + realPoint.getPoint());
//            return;
//        }
//        System.out.println("update failed");
//    }
//
//    @Test
//    @DisplayName("포인트 정보 갱신: Success")
//    public void updatePoint(){
//        Optional<Point> point = pointRepository.findById(1L);
//        if(point.isPresent()){
//            Point realPoint = point.get();
//            realPoint.updatePoint(5000L);
//            System.out.println("realPoint = " + realPoint.getPoint());
//            return;
//        }
//        System.out.println("update failed");
//    }
//
//    @Test
//    @DisplayName("포인트 정보 조회: Success")
//    public void readPoint(){
//        Optional<Point> point = pointRepository.findByMemberId(1L);
//        Assertions.assertThat(point.get()).isNotNull();
//        System.out.println("point = " + point);
//    }
//
//    @Test
//    @DisplayName("포인트 정보 삭제: success")
//    public void deletePoint(){
//        Optional<Point> point = pointRepository.findByMemberId(1L);
//        if(point.isPresent()) {
//            Point realPoint = point.get();
//            pointRepository.delete(realPoint);
//            System.out.println("delete success");
//            return;
//        }
//        System.out.println("delete failed");
//    }
//
//    @BeforeEach
//    public void testData(){
//        Point point = Point.builder()
//                .memberId(1L)
//                .build();
//        pointRepository.save(point);
//    }
//}
