package com.a509.service_payment.point.repository;

import com.a509.service_payment.point.domain.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
    Optional<Point> findByUserId(Long id);
}
