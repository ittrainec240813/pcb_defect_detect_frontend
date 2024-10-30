"use client"

import axios from "axios";
import styled from "@emotion/styled";
import ChatInput from "@/components/ChatInput";
import ChatView from "@/components/ChatView";
import { ChatLog } from "@/interfaces/ChatInterface";
import { useState } from "react";

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "end",
  width: "100%",
  height: "90vh",
  padding: "1rem"
});

export default function Chat() {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);

  const handleChatLogUpdate = (newChatLog: ChatLog) => {
    setChatLogs(oldChatLog => [...oldChatLog, newChatLog]);
  }

  const onChatSend = async(newChatLog: ChatLog) => {
    handleChatLogUpdate(newChatLog);

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rag`, {
      query: newChatLog.content
    }).then(res => {
      handleChatLogUpdate({from: "Bot", content: res.data.answer});
    })
    .catch(err => {
      console.log(err);
    });

  }

  return (
    <StyledContainer>
      <ChatView ChatLogs={chatLogs} />
      <ChatInput onSendMessage={onChatSend} />
    </StyledContainer>
  )
}