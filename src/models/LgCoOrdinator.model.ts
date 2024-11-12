import mongoose, { Schema } from "mongoose";

const lgCoordinatorSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "LG Coordinator",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "lg-coordinator",
  },
  profileImageUrl: {
    type: String,
    default: "https://sesrcp.in/Uploads/Logo/1595215490.png",
  },
  department: {
    type: String,
    required: true,
  },
  isAdminApproved: {
    type: Boolean,
    default: true,
  },
});

const LGCoordinator =
  mongoose.models.LGCoordinator ||
  mongoose.model("LGCoordinator", lgCoordinatorSchema);
export default LGCoordinator;
