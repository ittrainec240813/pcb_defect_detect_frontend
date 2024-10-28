import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { ChatLog } from "@/interfaces/ChatInterface";
import { useState } from "react";

const InputContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid",
  color: "white",
  borderRadius: "5px",
  padding: "0.5rem",
  width: "80%",
  backgroundColor: "#212121"
})

interface ChatInputProps {
  onSendMessage: (newChatLog: ChatLog) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [prompt, setPrompt] = useState<string>("")

  const handleClick = () => {
    setPrompt("");
    onSendMessage({from: "User", content: prompt});
  }

  return(
    <InputContainer>
      <TextField
        multiline
        variant="filled"
        placeholder="Say something"
        hiddenLabel
        sx={{width: "100%"}}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        slotProps={{
          input: {style: {color: "#FFFFFF"}}
        }}
      />
      <Button onClick={handleClick}>
        <SendIcon />
      </Button>
    </InputContainer>
  )
}

export default ChatInput