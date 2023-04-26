package com.a509.service_payment.orderitem.repository;

import com.a509.service_payment.orderitem.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository <OrderItem, Long> {
}
