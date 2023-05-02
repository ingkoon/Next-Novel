package com.a509.service_payment.order.repository;

import com.a509.service_payment.order.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByMemberId(Long memberId);
    Boolean existsByReceiptId(String receiptId);
}
