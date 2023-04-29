package com.a509.service_payment.order;

import com.a509.service_payment.common.bootpay.BootPayComponent;
import com.a509.service_payment.item.repostiory.ItemRepository;
import com.a509.service_payment.order.dto.TokenResponseDto;
import com.a509.service_payment.order.repository.OrderRepository;
import com.a509.service_payment.order.service.OrderService;
import com.a509.service_payment.orderitem.repository.OrderItemRepository;
import com.a509.service_payment.point.repository.PointRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;

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
//    @Test
//    @DisplayName("부트 페이 연결 : success")
//    public void connectBootPay(){
//        TokenResponseDto token = orderService.getTokenByBootPay();
//        System.out.println("token = " + token);
//    }
}
