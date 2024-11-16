"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@/context/useAuth";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("important");
  const [isImportant, setIsImportant] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [validTill, setValidTill] = useState<Date | null>(new Date());
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const { user } = useUser();

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
      try {
        const response = await axios.post("/api/helper/upload-img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadedImageUrl(response.data.data.secure_url);
        setLoading(false);
        toast.success("Image uploaded successfully!");
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        toast.error("An error occurred while uploading the image.");
      }
    }
  };

  useEffect(() => {
    if (title && description && uploadedImageUrl) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, description, uploadedImageUrl]);

  const handleSubmit = async () => {
    if (!title || !description || !uploadedImageUrl) {
      toast.error("Please fill all the fields.");
      return;
    }
    if (tags === "important") {
      setIsImportant(true);
    }
    const data = {
      title,
      description,
      tags,
      isImportant,
      author: user?.name,
      authorDepartment: user?.department,
      validTill,
      image: uploadedImageUrl,
    };

    try {
      const response = axios.post("/api/notices/addNotice", data);
      toast.promise(response, {
        loading: "Adding notice...",
        success: () => {
          setTitle("");
          setDescription("");
          setTags("");
          setIsImportant(false);
          setImage(null);
          setImagePreview(null);
          setUploadedImageUrl(null);
          setError(null);
          setDisabled(true);
          setValidTill(new Date());
          return "Notice added successfully!";
        },
        error: "An error occurred while adding the notice.",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-[102rem]">
      <div
        className="w-full max-w-lg rounded-xl p-10"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Add Notice</h1>
        <label className="mb-2 text-lg w-full">
          <div className="label">
            <span className="text-lg">Title</span>
          </div>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full textarea textarea-bordered bg-transparent text-base-content"
          />
        </label>
        <label className="mb-2 text-lg w-full">
          <div className="label">
            <span className="text-lg">Description</span>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 w-full textarea textarea-bordered bg-transparent text-base-content"
          />
        </label>
        <label className="mb-2 text-lg w-full">
          <div className="label">
            <span className="text-lg">Valid Upto</span>
          </div>
          <input
            type="datetime-local"
            value={validTill ? validTill.toISOString().substring(0, 16) : ""}
            onChange={(e) => setValidTill(new Date(e.target.value))}
            className="mb-4 w-full textarea textarea-bordered bg-transparent text-base-content"
          />
        </label>
        <label className="text-lg w-full">
          <div className="label">
            <span className="text-lg">Tag</span>
          </div>
          <select
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mb-4 w-full  text-base-content select select-bordered"
          >
            <option defaultChecked>Choose Tag</option>
            <option value="important">Important</option>
            <option value="holiday">Holiday</option>
            <option value="event">Event</option>
            <option value="announcement">Announcement</option>
          </select>
        </label>
        <label className="mb-2 text-lg w-full">
          <div className="label">
            <span className="text-lg">Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className=""
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-4 w-full rounded-lg"
            />
          )}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleUploadImage}
              disabled={loading || !image}
              className="rounded-lg bg-primary text-primary-content px-6 py-3 font-bold transition duration-300 ease-in-out hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95"
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </label>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className={`rounded-lg bg-accent text-accent-content px-6 py-3 font-bold transition duration-300 ease-in-out hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95${
              !uploadedImageUrl ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;
