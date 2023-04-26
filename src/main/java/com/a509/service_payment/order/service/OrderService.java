package com.a509.service_payment.order.service;

import com.a509.service_payment.common.bootpay.BootPayComponent;
import com.a509.service_payment.order.dto.ConfirmRequest;
import com.a509.service_payment.order.dto.TokenResponse;
import com.a509.service_payment.order.repository.OrderRepository;
import com.a509.service_payment.point.domain.Point;
import com.a509.service_payment.point.exception.NoSuchPointException;
import com.a509.service_payment.point.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final PointRepository pointRepository;
    private final BootPayComponent bootPayComponent;

    public void findByOrder(Long orderId){
        orderRepository.findById(orderId);
    }

    public TokenResponse getTokenByBootPay() throws Exception{
        HashMap<String, Object> hashMap = bootPayComponent.connectBootPay();
        String token = hashMap.get("access_token").toString();
        log.info("token value is : " + token);
        return new TokenResponse()
                .fromEntity(token);
    }

    @Transactional
    public HashMap<String, Object> confirmOrder(ConfirmRequest request) throws Exception {
        Point point =  pointRepository
                .findByMemberId(request.getMemberId())
                .orElseThrow(NoSuchPointException::new);

        point.updatePoint(request.getPoint());

        HashMap<String, Object> result = bootPayComponent.confirmOrder(request.getReceiptId());
        return result;
    }
}
