package com.example.jukebox.Controller;

import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
class JukeboxController {
    @RequestMapping(value="/", method=RequestMethod.GET)
    public ResponseEntity<Void> test() {
        return ResponseEntity.ok().build();
    }

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
    // }

}