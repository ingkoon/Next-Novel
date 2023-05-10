package com.a509.repository;

import com.a509.domain.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
    Optional<Point> findByNickName(String nickName);
    Boolean existsByNickName(String nickName);
}
