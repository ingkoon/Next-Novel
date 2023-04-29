package com.a509.service_payment.item.repostiory;

import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.enums.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByName(Items items);
}
