package ksr930.spring.websocket.demo2.service;

import ksr930.spring.websocket.demo2.dto.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Service
public class WSService {
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WSService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyFrontend(final String message) {
        ResponseMessage response = new ResponseMessage(message);
        messagingTemplate.convertAndSend("/topic/messages", response);
    }

    public void notifyUser(final String id, final String privateMessage) {
        ResponseMessage response = new ResponseMessage(privateMessage);
        messagingTemplate.convertAndSendToUser(id, "/topic/messages", response);
    }
}
