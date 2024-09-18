import mongoose from "mongoose";
const { Schema } = mongoose;

const noticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorDepartment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  validTill: {
    type: Date,
    required: true,
  },
  tags: {
    type: String,
    required: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
export default Notice;
