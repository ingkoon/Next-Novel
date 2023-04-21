package com.example.jukebox;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Configuration
public class JukeboxHandler extends TextWebSocketHandler {
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        System.out.println(message.toString());
    }

    // @Override
    // protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
    //     System.out.println(session);
    //     // System.out.println(super.handleBinaryMessage(session, message));
        
    // }
    
    // @OnOpen
    // public void onOpen(Session session) {
    //     System.out.println("WebSocket opened: " + session.getId());
    // }

    // @OnMessage
    // public void onMessage(String message, Session session) {
    //     System.out.println("Received message: " + message);
    //     try {
    //         session.getBasicRemote().sendText("Echo: " + message);
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }
    // }

    // @OnClose
    // public void onClose(Session session) {
    //     System.out.println("WebSocket closed: " + session.getId());
    // }

    // @OnError
    // public void onError(Session session, Throwable error) {
    //     System.err.println("WebSocket error: " + error.getMessage());
    // }
}