"use client"

import styled from "@emotion/styled";
import ChatInput from "@/components/ChatInput";
import ChatView from "@/components/ChatView";
import { ChatLog } from "@/interfaces/ChatInterface";
import { useState, useEffect } from "react";

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "end",
  width: "100%",
  height: "100vh",
  padding: "1rem"
});

export default function Chat() {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const handleChatLogUpdate = (newChatLog: ChatLog) => {
    setChatLogs(oldChatLog => [...oldChatLog, newChatLog]);
  }

  const onChatSend = (newChatLog: ChatLog) => {
    if (ws?.readyState != ws?.OPEN) connectWebSocket();
    handleChatLogUpdate(newChatLog);
    ws?.send(newChatLog.content);
  }

  const connectWebSocket = () => {
    //開啟
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_PATH}/chat`);
    socket.onopen = () => {
      console.log("socket connection established");
    }
    socket.onmessage = (event) => {
      handleChatLogUpdate({from: "Bot", content: event.data});
    }
    setWs(socket);
  };

  useEffect(() => {
    connectWebSocket();
  }, [])

  return (
    <StyledContainer>
      <ChatView ChatLogs={chatLogs} />
      <ChatInput onSendMessage={onChatSend} />
    </StyledContainer>
  )
}