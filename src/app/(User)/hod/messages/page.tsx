"use client";
import {
  Box,
  InputBase,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { Send } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [lgList, setLgList] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedLg, setSelectedLg] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const getLg = async () => {
      try {
        const response = await axios.post(
          "/api/getUsers/teachers/getTeacherByDepartment",
          {
            department: user.department.toLowerCase(),
          },
        );
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        console.log(response.data.teachers);
        setLgList(response.data.teachers);
      } catch (error) {
        console.error("Error fetching LG list", error);
      }
    };
    getLg();
  }, []);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages"); // Replace with your API endpoint
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post("/api/messages", {
        message: newMessage,
      });
      setMessages([...messages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{ width: "25%", padding: "1rem", borderRight: "2px solid #ddd" }}
      >
        {/* Placeholder for contact list or LG selection */}
        <Typography variant="h6" sx={{ padding: 2 }}>
          Local Guardians
        </Typography>
        <Divider />
        {lgList.length > 0 ? (
          <List className="flex flex-col gap-4">
            {lgList.map((lg, index) => (
              <ListItem
                className="rounded-md bg-slate-800 text-white hover:bg-slate-400 dark:bg-zinc-200 dark:text-dark dark:hover:bg-zinc-500"
                key={index}
                button
                // onClick={() => setSelectedLg(lg._id)}
                sx={{
                  backgroundColor:
                    selectedLg === lg._id ? "#f0f0f0" : "transparent",
                }}
              >
                <Avatar
                  key={index}
                  src={lg.profilePicture}
                  alt={lg.name}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedLg === lg._id ? "#f0f0f0" : "transparent",
                  }}
                  onClick={() => setSelectedLg(lg._id)}
                />
                <ListItemText
                  primary={lg.name}
                  secondary={lg.email}
                  className="text-white dark:text-dark"
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={{ padding: 2 }}>
            No Local Guardians found
          </Typography>
        )}
      </Box>
      <Box sx={{ width: "75%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            borderBottom: "2px solid #ddd",
          }}
        >
          <List>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={msg.message}
                    secondary={new Date(msg.timestamp).toLocaleTimeString()}
                    sx={{ textAlign: "left" }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box
          sx={{
            padding: 2,
            borderTop: "2px solid #ddd",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            fullWidth
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{
              flexGrow: 1,
              border: "1px solid #ddd",
              borderRadius: 1,
              padding: 1,
            }}
            className="dark:text-white"
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{ marginLeft: 1 }}
            className="flex items-center justify-center rounded-full dark:bg-zinc-200 hover:dark:bg-zinc-300"
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesPage;
