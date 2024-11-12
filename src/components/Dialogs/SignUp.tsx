import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import axios from "axios";
import { File as BufferFile } from "buffer";
import { Eye, EyeOffIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
  name: string;
  email: string;
  role: string;
  department: string;
  password: string;
  otp: string;
  division: string;
  prn: string;
  year: string;
  emailVerified: boolean;
  isVerified: boolean;
  profileImageUrl: string;
};

const SignUp = () => {
  // States
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
    otp: "",
    prn: "",
    emailVerified: false,
    year: "",
    profileImageUrl: "",
    isVerified: false,
    division: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState<File | null>();
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [otp, setOtp] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", image as Blob);
        const imageResponse = axios.post("/api/helper/upload-img", formData);
        toast.promise(
          imageResponse,
          {
            loading: "Uploading Image...",
            success: (data: any) => {
              setUser({ ...user, profileImageUrl: data.data.data.url });
              console.log(user);
              return "Image Uploaded Successfully";
            },
            error: (err) => `This just happened: ${err.response.data.error}`,
          },
          {
            success: {
              duration: 5000,
              icon: "🔥",
            },
            error: {
              duration: 5000,
              icon: "😒",
            },
          }
        );
      };
      uploadImage();
    }
  }, [image]);

  useEffect(() => {
    if (
      user.name &&
      user.email &&
      user.role &&
      user.department &&
      user.password.length >= 8 &&
      user.emailVerified &&
      user.otp &&
      user.profileImageUrl
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please drop an image file.");
    }
  };

  const handleSubmit = async () => {
    const responsePromise = axios.post("/api/auth/signup", user);
    toast.promise(
      responsePromise,
      {
        loading: "Loading",
        success: (data: any) => {
          (document.getElementById("signup") as HTMLDialogElement).close();
          return `Account Created Successfully for ${data.data.message}`;
        },
        error: (err) => `This just happened: ${err.response.data.message}`,
      },
      {
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "😒",
        },
      }
    );
  };

  // Verify Email
  const verifyEmail = async () => {
    const responsePromise = axios.post("/api/auth/verifyemail", {
      email: user.email,
    });
    toast.promise(
      responsePromise,
      {
        loading: "Loading...",
        success: (data: any) => {
          setOtp(data.data.token);
          (
            document.getElementById("otpContainer") as HTMLDialogElement
          ).showModal();
          return `Email Verified Successfully for ${data.data.email}`;
        },
        error: (err) => `This just happened: ${err.toString()}`,
      },
      {
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "😒",
        },
      }
    );
  };
  // Password Visibility
  const handleClickShowPassword = () => {
    setPasswordVisibilty(!passwordVisibilty);
  };

  return (
    <>
      <dialog id="signup" className="modal w-screen">
        <div className="modal-box max-w-none w-2/3">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 border-base-content"
              onClick={() => {
                (document.getElementById("login") as HTMLDialogElement).close();
              }}
            >
              <X />
            </button>
            <section className="relative z-10 overflow-hidden">
              <div className="container">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="mx-auto max-w-[500px] rounded bg-base px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                      <h3 className="mb-3 text-center text-2xl font-bold text-base-content sm:text-3xl">
                        Create your account
                      </h3>
                      {/* Full Name */}
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm text-base-content"
                        >
                          {" "}
                          Full Name{" "}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                          placeholder="Enter your full name"
                          className="w-full rounded-sm border border-stroke bg-base-300 text-base-content px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary"
                        />
                      </div>
                      {/* Email */}
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm text-base-content"
                        >
                          {" "}
                          Work Email{" "}
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                            placeholder="Enter your Email"
                            className="w-full rounded-sm border border-stroke bg-base-300 text-base-content px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary"
                          />
                          <button
                            className="rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base text-base-content outline-none transition-all duration-300 focus:border-primary hover:bg-accent hover:text-accent-content hover:cursor-pointer"
                            onClick={verifyEmail}
                          >
                            Verify
                          </button>
                          <br />
                        </div>
                      </div>
                      {/* Profile Image Url */}
                      <div className="mb-8">
                        <label
                          htmlFor="profileImageUrl"
                          className="mb-3 block text-sm text-base-content"
                        >
                          Upload Your Nice Photo
                        </label>
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`w-full rounded-sm border border-stroke bg-base-300 p-6 text-base-content text-center outline-none transition-all duration-300 ${
                            dragging
                              ? "border-primary bg-base-200"
                              : "border-stroke"
                          }`}
                        >
                          {image ? (
                            <p>{image.name}</p>
                          ) : (
                            <p>Drag & drop an image here, or click to upload</p>
                          )}
                          <input
                            type="file"
                            name="profileImageUrl"
                            id="profileImageUrl"
                            className="hidden"
                            accept="image/* .png .jpeg .jpg"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      {/* Department */}
                      <div className="mb-8">
                        <label
                          htmlFor="department"
                          className="mb-3 block text-sm text-base-content"
                        >
                          {" "}
                          Your Department ??{" "}
                        </label>
                        <select
                          value={user.department}
                          onChange={(e) =>
                            setUser({ ...user, department: e.target.value })
                          }
                          name="department"
                          className="w-full rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
                        >
                          <option defaultValue="">
                            Choose Your Department
                          </option>
                          <option value="computer">Computer Engineering</option>
                          <option value="aiml">
                            Artificial Intelligence and Machine Learning
                          </option>
                          <option value="ds">
                            Computer Science & Engineering ( Data Science )
                          </option>
                          <option value="entc">
                            Electronics & Telecommunication Engineering
                          </option>
                          <option value="mechanical">
                            Mechanical Engineering
                          </option>
                          <option value="electrical">
                            Electrical Engineering
                          </option>
                          <option value="civil">Civil Engineering</option>
                          <option value="cs">
                            Computer Science & Engineering
                          </option>
                          <option value="aid">
                            Artificial Intelligence & Data Science
                          </option>
                          <option value="it">Information Technology</option>
                          <option value="ash">
                            Applied Sciences & Humanities
                          </option>
                          <option value="research">Research Center</option>
                          <option value="mca">
                            Master of Computer Application (MCA)
                          </option>
                        </select>
                      </div>
                      {/* Role */}
                      <div className="mb-8">
                        <label
                          htmlFor="Role"
                          className="mb-3 block text-sm text-base-content"
                        >
                          {" "}
                          Your Role ??{" "}
                        </label>
                        <select
                          value={user.role}
                          onChange={(e) =>
                            setUser({ ...user, role: e.target.value })
                          }
                          name="role"
                          className="w-full rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
                        >
                          <option defaultValue="">Choose Your Role</option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="lgcoordinator">LG Coordinator</option>
                          <option value="hod">HOD</option>
                        </select>
                      </div>
                      {/* PRN */}
                      {user.role === "student" ? (
                        <>
                          {/* Year */}
                          <div className="mb-8">
                            <label
                              htmlFor="year"
                              className="mb-3 block text-sm text-base-content"
                            >
                              {" "}
                              Current Year{" "}
                            </label>
                            <select
                              value={user.year}
                              onChange={(e) =>
                                setUser({ ...user, year: e.target.value })
                              }
                              name="year"
                              className="w-full rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
                            >
                              <option defaultValue="">Choose Your Year</option>
                              <option value="fy">FYBTech</option>
                              <option value="sy">SYBTech</option>
                              <option value="ty">TYBTech</option>
                              <option value="btech">BTech</option>
                            </select>
                          </div>
                          {/* Division */}
                          <div className="mb-8">
                            <label
                              htmlFor="prn"
                              className="mb-3 block text-sm text-base-content"
                            >
                              {" "}
                              Your Division{" "}
                            </label>
                            <select
                              value={user.division}
                              onChange={(e) =>
                                setUser({ ...user, division: e.target.value })
                              }
                              name="division"
                              className="w-full rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
                            >
                              <option defaultValue="">
                                Choose Your Division
                              </option>
                              <option value="a">A</option>
                              <option value="b">B</option>
                              <option value="c">C</option>
                            </select>
                          </div>
                          {/* PRN */}
                          <div className="mb-8">
                            <label
                              htmlFor="prn"
                              className="mb-3 block text-sm text-base-content"
                            >
                              {" "}
                              Your PRN{" "}
                            </label>
                            <input
                              type="number"
                              max={2777777777}
                              name="prn"
                              value={user.prn}
                              onChange={(e) =>
                                setUser({ ...user, prn: e.target.value })
                              }
                              placeholder="Enter your PRN"
                              className="w-full rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
                            />
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {/* Password */}
                      <div className="mb-8">
                        <label
                          htmlFor="password"
                          className="mb-3 block text-sm text-base-content"
                        >
                          {" "}
                          Your Password{" "}
                        </label>
                        <OutlinedInput
                          className="h-[50px] w-full rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base text-base-content outline-none transition-all duration-300 focus:border-primary"
                          id="outlined-adornment-password"
                          type={passwordVisibilty ? "text" : "password"}
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {passwordVisibilty ? (
                                  <EyeOffIcon className="text-base-content mr-4" />
                                ) : (
                                  <Eye className="text-base-content mr-4" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </div>
                      <div className="mb-8 flex">
                        <label
                          htmlFor="checkboxLabel"
                          className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="checkboxLabel"
                              className="sr-only"
                            />
                            <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20">
                              <span className="opacity-0">
                                <svg
                                  width="11"
                                  height="8"
                                  viewBox="0 0 11 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="0.4"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <span>
                            By creating account means you agree to the
                            <a
                              href="#0"
                              className="text-primary hover:underline"
                            >
                              {" "}
                              Terms and Conditions{" "}
                            </a>
                            , and our
                            <a
                              href="#0"
                              className="text-primary hover:underline"
                            >
                              {" "}
                              Privacy Policy{" "}
                            </a>
                          </span>
                        </label>
                      </div>
                      {/* Sign UP Protocol */}
                      <div className="mb-6">
                        <button
                          disabled={disabled}
                          className={`flex w-full items-center justify-center rounded-sm bg-accent text-accent-content px-9 py-4 font-medium shadow-submit duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-submit-dark`}
                          onClick={handleSubmit}
                        >
                          Sign up
                        </button>
                      </div>
                      <p className="text-center text-base font-medium text-body-color">
                        Already using LG Data Dairies?{" "}
                        <button
                          className="text-primary hover:underline"
                          onClick={() => {
                            (
                              document.getElementById(
                                "login"
                              ) as HTMLDialogElement
                            ).showModal();
                          }}
                        >
                          Sign in
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 top-0 z-[-1]">
                <svg
                  width="1440"
                  height="969"
                  viewBox="0 0 1440 969"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_95:1005"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1440"
                    height="969"
                  >
                    <rect width="1440" height="969" fill="#090E34" />
                  </mask>
                  <g mask="url(#mask0_95:1005)">
                    <path
                      opacity="0.1"
                      d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                      fill="url(#paint0_linear_95:1005)"
                    />
                    <path
                      opacity="0.1"
                      d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                      fill="url(#paint1_linear_95:1005)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_95:1005"
                      x1="1178.4"
                      y1="151.853"
                      x2="780.959"
                      y2="453.581"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop
                        offset="1"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_95:1005"
                      x1="160.5"
                      y1="220"
                      x2="1099.45"
                      y2="1192.04"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop
                        offset="1"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </section>
          </form>
        </div>
      </dialog>
      <dialog id="otpContainer" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box flex flex-col justify-center items-center gap-5">
          <h1 className="mt-5">Verify Your Email</h1>
          <label
            htmlFor="name"
            className="mb-3 block text-sm text-base-content"
          >
            Please Enter the OTP
          </label>
          <div className="flex gap-2 mt-5">
            <input
              type="text"
              name="otp"
              value={user.otp}
              onChange={(e) => setUser({ ...user, otp: e.target.value })}
              placeholder="Enter OTP"
              className="w-50 rounded-sm border border-stroke bg-base-300 px-6 py-3 text-base-content outline-none transition-all duration-300 focus:border-primary"
            />
            <button
              className="w-50 rounded-sm border border-stroke bg-accent text-accent-content px-6 py-3 outline-none transition-all duration-300 focus:border-primary"
              onClick={() => {
                if (otp === user.otp) {
                  setUser({ ...user, emailVerified: true });
                  toast.success("Email Verified Successfully");
                  (
                    document.getElementById("otpContainer") as HTMLDialogElement
                  ).close();
                  (
                    document.getElementById("signup") as HTMLDialogElement
                  ).showModal();
                } else {
                  toast.error("Invalid OTP");
                }
              }}
            >
              Verify
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline text-base-content">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SignUp;
