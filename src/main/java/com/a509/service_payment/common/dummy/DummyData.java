package com.a509.service_payment.common.dummy;


import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.enums.Items;
import com.a509.service_payment.item.repostiory.ItemRepository;
import com.a509.service_payment.order.domain.Order;
import com.a509.service_payment.order.repository.OrderRepository;
import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DummyData implements CommandLineRunner {
    private final ItemRepository itemRepository;
    private final PointRepository pointRepository;
    private final OrderRepository orderRepository;

    @Override
    public void run(String... args) throws Exception {
        addPoint();
        addItem();
        addOrder();
    }

    private void addItem(){
        for (Items items : Items.values()) {
            Item tmp = Item.builder()
                    .name(items)
                    .build();
            itemRepository.save(tmp);
        }
    }

    private void addPoint(){
        for (long i = 1L; i <= 10; i++) {
            Point point = Point.builder().memberId(i).build();
            pointRepository.save(point);
        }
    }

    public void addOrder(){
        for (int i = 0; i < 10; i++) {
            Order order = Order
                    .builder()
                    .userId(1L)
                    .price(500L)
                    .receiptId("644a307d966b740020754edc")
                    .build();
            orderRepository.save(order);
        }
    }

}
