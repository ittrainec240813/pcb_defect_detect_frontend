import { 
  Avatar,
  Card, 
  CardContent,
  CardHeader,
  Paper, 
  Typography 
} from "@mui/material";
import React from "react";
import { Person, SmartToy } from "@mui/icons-material";
import { ChatLog } from "@/interfaces/ChatInterface";

interface ChatViewProps {
  ChatLogs: ChatLog[];
}

const ChatView: React.FC<ChatViewProps> = ({ ChatLogs }) => {

  return(
    <Paper sx={{
      width: "80%",
      height: "100%",
      maxWidth: "80%",
      maxHeight: "100%",
      margin: "1rem",
      backgroundColor: "#212121",
      overflowY: "scroll"
    }}>
      {ChatLogs.map((chatLog, index) => (
        <Card key={index} sx={{ 
          padding: "1rem", 
          margin: "0.5rem", 
          backgroundColor: "#000000", 
          color: "#FFFFFF" 
        }}>
          <CardHeader
            avatar={
              <Avatar>
                {chatLog.from === "Bot"? <SmartToy/> : <Person/>}
              </Avatar>
            }
          />
          <CardContent>
            <Typography>
              {chatLog.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Paper>
  )
}

export default ChatView;