const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImageUrl: {
    type: String,
  },
  isAdminApproved: {
    type: Boolean,
    default: false,
  },
});

const HOD = mongoose.models.HOD || mongoose.model("HOD", hodSchema);
export default HOD;
