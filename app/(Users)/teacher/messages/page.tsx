"use client";
// components/ChatUI.js

import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [lgList, setLgList] = useState([]);
  const [selectedLg, setSelectedLg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch initial LG list
    const fetchLgList = async () => {
      try {
        const response = await axios.get("/api/lgs"); // Replace with your API endpoint
        setLgList(response.data);
      } catch (error) {
        console.error("Error fetching LG list", error);
      }
    };

    fetchLgList();
  }, []);

  useEffect(() => {
    // Fetch messages when LG is selected
    const fetchMessages = async () => {
      if (!selectedLg) return;

      try {
        const response = await axios.get(`/api/messages/${selectedLg}`); // Replace with your API endpoint
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, [selectedLg]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedLg) return;

    try {
      const response = await axios.post("/api/messages", {
        lgId: selectedLg,
        message: newMessage,
      });
      setMessages([...messages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "100%",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chat with Local Guardians
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 1,
          padding: 2,
          marginBottom: 2,
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={msg.message}
                  secondary={new Date(msg.timestamp).toLocaleTimeString()}
                  sx={{ textAlign: msg.sender === "hod" ? "right" : "left" }}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ height: "100%" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatUI;
