import { useState } from "react";
import style from "./Ai.module.css";
import { Button, TextField, Box, Paper } from "@mui/material";
import { getDataAi } from "../../api/ai/ai.api";
import Notification from "../Notifications/Notification";

export default function Ai() {
  const [messageAi, setMessageAi] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  const handleInput = async () => {
    if (message.length === 0) {
      return setAlert({ type: "error", message: "Please enter a message" });
    }
    setMessage("");

    try {
      const response = await getDataAi(message);
      if (!response) {
        setAlert({ type: "error", message: "No message from AI" });
      }
      setMessageAi(response);
    } catch (error) {
      setAlert({ type: "error", message: "Error loading Ai" });
    }
  };

  return (
    <div className={style["ai-container"]}>
      <Paper elevation={3} className={style["chat-box"]}>
        <Box className={style["chat-messages"]}>{messageAi}</Box>
        <Box className={style["chat-buttons-container"]}>
          <Button
            className={style["recomended-series-button"]}
            variant="contained"
            onClick={() => setMessage("Recommended series")}
          >
            Recommended Series
          </Button>
          <Button
            className={style["recomended-series-button"]}
            variant="contained"
            onClick={() => setMessage("Episode suggestion")}
          >
            Episode Suggestion
          </Button>
        </Box>
        <Box className={style["chat-input-container"]}>
          <TextField
            sx={{ input: { color: "white" } }}
            label="Enter your request"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            className={style["chat-input"]}
            autoComplete="off"
          />
          <Button
            variant="contained"
            className={style["chat-button"]}
            onClick={handleInput}
          >
            Send
          </Button>
        </Box>
        <Notification alert={alert} setAlert={setAlert} />
      </Paper>
    </div>
  );
}
