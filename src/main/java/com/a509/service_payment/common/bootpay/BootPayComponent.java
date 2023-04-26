package com.a509.service_payment.common.bootpay;

import com.a509.service_payment.common.bootpay.exception.InvalidReceiptException;
import com.a509.service_payment.common.bootpay.exception.NoTokenException;
import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.Cancel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class BootPayComponent {
    @Value("${boot-pay.rest-api-key}")
    private String restApiKey;
    @Value("${boot-pay.private-key}")
    private String privateKey;
    private final Bootpay bootpay = new Bootpay(restApiKey, privateKey);

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
    public HashMap<String, Object> validateOrder(String receiptId) throws Exception{
        HashMap<String, Object> token = bootpay.getAccessToken();

        if(token.get("error_code")!=null)
            throw new NoTokenException("유효한 토큰이 없습니다.");
        HashMap<String, Object> receipt = bootpay.getReceipt(receiptId);
        if(receipt.get("error_code")!=null)
            throw new InvalidReceiptException("유효한 결제 정보가 없습니다.");

        return receipt;
    }

    /*
    결제 검증 로직
    */
    public HashMap<String, Object> confirmOrder(String receiptId) throws Exception {
        return bootpay.confirm(receiptId);
    }

    /*
    결제 취소
     */
    public HashMap<String, Object> cancelOrder(String receiptId) throws Exception{
        Cancel cancel = new Cancel();
        cancel.receiptId = receiptId;
        cancel.cancelUsername = "관리자";
        cancel.cancelMessage = "테스트 결제";

        HashMap<String, Object> receiptCancel = bootpay.receiptCancel(cancel);
        if(receiptCancel.get("error_code") != null)
            throw new InvalidReceiptException("결제 정보를 확인할 수 없습니다.");
        return receiptCancel;
    }
}
