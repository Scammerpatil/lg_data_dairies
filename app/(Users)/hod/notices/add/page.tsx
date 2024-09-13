"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  Button,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { notification } from "@/helper/notification";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("important");
  const [isImportant, setIsImportant] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [author, setAuthor] = useState("");
  const [authorDepartment, setAuthorDepartment] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuthor(user.name);
      setAuthorDepartment(user.department);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("folder", "notices");
      const response = axios.post("/api/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.promise(response, {
        loading: "Uploading image...",
        success: (result: any) => {
          setUploadedImageUrl(result.data.data.secure_url);
          setLoading(false);
          return "Image uploaded successfully!";
        },
        error: (error) => {
          setError(error.message);
          setLoading(false);
          return "An error occurred while uploading the image.";
        },
      });
    }
  };

  useEffect(() => {
    if (title && description && uploadedImageUrl) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, description, uploadedImageUrl]);

  const handleSubmit = () => {
    if (!title || !description || !uploadedImageUrl) {
      toast.error("Please fill all the fields.");
    }
    if (tags === "important") {
      setIsImportant(true);
    }
    const data = {
      title,
      description,
      tags,
      isImportant,
      author,
      authorDepartment,
      image: uploadedImageUrl,
    };
    const response = axios.post("/api/notices/addNotice", data);
    toast.promise(response, {
      loading: "Adding notice...",
      success: () => {
        // notification();
        return "Notice added successfully!";
      },
      error: (error) => {
        return error.message;
      },
    });

    setTitle("");
    setDescription("");
    setTags("");
    setIsImportant(false);
    setImage(null);
    setImagePreview(null);
    setUploadedImageUrl(null);
    setError(null);
    setDisabled(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="w-full max-w-lg rounded-xl p-10 dark:bg-gray-light"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold dark:text-white">
          Add Notice
        </h1>
        <FormControl fullWidth className="text-dark dark:text-gray-light">
          <FormLabel className="mb-2 text-lg dark:text-white">Title</FormLabel>
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            className="mb-4"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <FormLabel className="mb-2 text-lg dark:text-white">
            Description
          </FormLabel>
          <TextField
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            className="mb-4"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <InputLabel className="text-lg dark:text-white">Tags</InputLabel>
          <Select
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            variant="outlined"
            fullWidth
            className="dark:text-white"
          >
            <MenuItem defaultChecked>Choose Tag</MenuItem>
            <MenuItem value="important">Important</MenuItem>
            <MenuItem value="holiday">Holiday</MenuItem>
            <MenuItem value="event">Event</MenuItem>
            <MenuItem value="announcement">Announcement</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <FormLabel className="mb-2 text-lg dark:text-white">Image</FormLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="dark:text-white"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-4 w-full rounded-lg"
            />
          )}
          <div className="mt-4 flex justify-center">
            <Button
              variant="contained"
              onClick={handleUploadImage}
              disabled={loading}
              className="rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:scale-95"
            >
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </FormControl>
        {uploadedImageUrl && (
          <div className="mt-4 text-green-500">
            Image uploaded successfully!
          </div>
        )}
        {error && <div className="mt-4 text-red-500">{error.toString()}</div>}
        <div className="mt-6 flex justify-center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={disabled}
            className={`rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95 ${
              !uploadedImageUrl ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;
