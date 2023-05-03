package com.a509.service_payment.order;

import com.a509.service_payment.common.bootpay.BootPayComponent;
import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.enums.Items;
import com.a509.service_payment.item.repostiory.ItemRepository;
import com.a509.service_payment.order.domain.Order;
import com.a509.service_payment.order.dto.response.TokenResponseDto;
import com.a509.service_payment.order.dto.response.OrderResponseDto;
import com.a509.service_payment.order.repository.OrderRepository;
import com.a509.service_payment.order.service.OrderService;
import com.a509.service_payment.orderitem.repository.OrderItemRepository;
import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.repository.PointRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
    @InjectMocks
    private OrderService orderService;

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private ItemRepository itemRepository;
    @Mock
    private OrderItemRepository orderItemRepository;
    @Mock
    private PointRepository pointRepository;
    @Test
    @DisplayName("특정 id의 주문 목록 GET: success")
    public void findOrderList(){
        for (int i = 0; i < 10; i++) {
            Order order = Order
                    .builder()
                    .userId(1L)
                    .price(500L)
                    .receiptId("644a307d966b740020754edc")
                    .build();
            orderRepository.save(order);
        }

        List<OrderResponseDto> orders = orderService.findOrders(1L);
        System.out.println(orders.size());
        for (OrderResponseDto order : orders) {
            System.out.println(order);
        }
    }

    @BeforeEach
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

    @BeforeEach
    private void addItem(){
        for (Items items : Items.values()) {
            Item tmp = Item.builder()
                    .name(items)
                    .build();
            itemRepository.save(tmp);
        }
    }

    @BeforeEach
    private void addPoint(){
        for (long i = 1L; i <= 10; i++) {
            Point point = Point.builder().memberId(i).build();
            pointRepository.save(point);
        }
    }
}
