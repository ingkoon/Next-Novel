//package com.a509.common.dummy;
//
//import com.a509.domain.Order;
//import com.a509.repository.OrderRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//
//@RequiredArgsConstructor
//public class Dummy  implements CommandLineRunner {
//    private final OrderRepository orderRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        addOrder();
//    }
//
//    public void addOrder(){
//        for (int i = 0; i < 10; i++) {
//            Order order = Order
//                    .builder()
//                    .itemId(1L)
//                    .nickName("orlando")
//                    .price(500L)
//                    .receiptId("644a307d966b740020754edc")
//                    .build();
//            orderRepository.save(order);
//        }
//    }
//}
