//package com.a509.common;
//
//import orchestrator.event.OrderCreateEvent;
//import org.axonframework.commandhandling.gateway.CommandGateway;
//import org.axonframework.modelling.saga.SagaEventHandler;
//import org.axonframework.modelling.saga.SagaLifecycle;
//import org.axonframework.modelling.saga.StartSaga;
//import org.axonframework.spring.stereotype.Saga;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.UUID;
//
//@Saga
//public class OrderManageMentSaga {
//
//    @Autowired
//    private CommandGateway commandGateway;
//    @StartSaga
//    @SagaEventHandler(associationProperty = "orderId")
//    void handle(OrderCreateEvent orderCreateEvent) {
//        String paymentId = UUID.randomUUID().toString();
//        System.out.println("Saga invoked");
//
//        //associate Saga
//        SagaLifecycle.associateWith("paymentId", paymentId);
//        System.out.println("order id" + orderCreateEvent.getId());
//
//        //send the commands
////        commandGateway.send<CreateInvoiceCommand>(CreateInvoiceCommand(paymentId, orderCreatedEvent.orderId))
//    }
//}