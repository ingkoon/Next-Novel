package com.example.payment.common.bootpay;
import com.example.payment.common.bootpay.exception.NoTokenException;
import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.Cancel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Slf4j
@Component
public class BootPayComponent {
    @Value("${boot-pay.rest-api-key}")
    private String restApiKey;
    @Value("${boot-pay.private-key}")
    private String privateKey;

    /*
    결제 토큰 발급
    */
    public HashMap<String, Object> connectBootPay() throws Exception{
        Bootpay bootpay = new Bootpay(restApiKey, privateKey);

        HashMap<String, Object> res = bootpay.getAccessToken();

        if(res.get("error_code") == null) { //success
            log.info("goGetToken success: " + res);
            return res;
        }
        throw new NoTokenException();
    }

    /*
    결제 검증 로직
     */
    public HashMap<String, Object> validateOrder(String receiptId) throws Exception {
        Bootpay bootpay = new Bootpay(restApiKey, privateKey);
        return bootpay.confirm(receiptId);
    }

    /*
    결제 취소
     */
    public HashMap<String, Object> cancelOrder(String receiptId) throws Exception{
        Bootpay bootpay = new Bootpay(restApiKey, privateKey);
        Cancel cancel = new Cancel();
        cancel.receiptId = receiptId;
        cancel.cancelUsername = "관리자";
        cancel.cancelMessage = "테스트 결제";
        return bootpay.receiptCancel(cancel);
    }
}
