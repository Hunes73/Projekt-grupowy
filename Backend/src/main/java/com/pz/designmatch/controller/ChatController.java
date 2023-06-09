package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.dto.response.ChatNotification;
import com.pz.designmatch.dto.response.InterlocutorResponse;
import com.pz.designmatch.service.impl.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, ChatMessageService chatMessageService) {
        this.messagingTemplate = messagingTemplate;
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessageRequest chatMessageRequest) {
        ChatMessageResponse saved = chatMessageService.saveChatMessage(chatMessageRequest);
        messagingTemplate.convertAndSendToUser(
                saved.getRecipientUsername(), "/queue/messages",
                new ChatNotification(
                        saved.getId(),
                        saved.getSenderUsername(),
                        saved.getRecipientUsername()));
    }

    @GetMapping("/messages/{senderId}/{recipientId}/count")
    public ResponseEntity<Long> countNewMessages(
            @PathVariable String senderId,
            @PathVariable String recipientId) {

        return ResponseEntity.ok(chatMessageService.countNewMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages(@PathVariable String senderId,
                                              @PathVariable String recipientId) {
        return ResponseEntity.ok(chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<?> findMessage(@PathVariable Long id) {
        return ResponseEntity.ok(chatMessageService.findById(id));
    }

    @GetMapping("/messages/conversations/{username}")
    public ResponseEntity<List<InterlocutorResponse>> findConversations(@PathVariable String username) {
        return ResponseEntity.ok(chatMessageService.findConversations(username));
    }
}
