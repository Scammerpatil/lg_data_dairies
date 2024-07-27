"use client";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { IconButton, InputAdornment } from "@mui/material";

const SignupPage = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [container, setContainer] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpContainer, setOtpContainer] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
    otp: "",
    prn: "",
    isVerified: false,
  });

  useEffect(() => {
    if (
      user.name &&
      user.email &&
      user.role &&
      user.department &&
      user.password.length >= 8 &&
      emailVerified &&
      user.otp
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);
  // Submit the form
  const handleSubmit = async () => {
    const responsePromise = axios.post("/api/signup", user);
    toast.promise(
      responsePromise,
      {
        loading: "Loading",
        success: (data) => `Successfully saved ${data.data.message}`,
        error: (err) => `This just happened: ${err.response.data.message}`,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "😒",
        },
      },
    );
    const response = await responsePromise;
    if (response.data.success) {
      router.push("/signin");
    }
  };
  // Verify Email
  const verifyEmail = async () => {
    setContainer(false);
    const responsePromise = axios.post("/api/verifyemail", {
      email: user.email,
    });
    toast.promise(
      responsePromise,
      {
        loading: "Loading",
        success: (data) => `Email Sent Successfully to ${data.data.email}`,
        error: (err) => `This just happened: ${err.toString()}`,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "😒",
        },
      },
    );
    const response = await responsePromise;
    setOtp(response.data.token);
    setOtpContainer(true);
    user.isVerified = true;
  };
  // Handle OTP
  const otpContainerClose = async () => {
    if (otpContainer) {
      if (otp === user.otp) {
        toast.success("OTP Verified");
        setEmailVerified(true);
        setOtpContainer(false);
        setContainer(false);
        user.isVerified = true;
      } else {
        toast.error("Invalid OTP");
      }
    } else {
      toast.error("OTP not verified");
    }
  };

  // handle Close button
  const handleClose = () => {
    setOtpContainer(false);
  };
  // Password Visibility
  const handleClickShowPassword = () => {
    setPasswordVisibilty(!passwordVisibilty);
  };
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  It's totally free and super easy
                </p>
                <button className="mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, register with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                {/* Full Name */}
                <div className="mb-8">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                {/* Email */}
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
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
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    <button
                      className={`rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      onClick={verifyEmail}
                    >
                      Verify
                    </button>
                    <br />
                  </div>
                  <button
                    className={`${
                      container ? "hidden" : ""
                    } mt-2 rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                    onClick={() => setOtpContainer(true)}
                  >
                    Open Container
                  </button>
                </div>
                {/* Role */}
                <div className="mb-8">
                  <label
                    htmlFor="Role"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Your Role ??{" "}
                  </label>
                  <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    name="role"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option defaultValue="">Choose Your Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="hod">HOD</option>
                  </select>
                </div>
                {/* Department */}
                <div className="mb-8">
                  <label
                    htmlFor="department"
                    className="mb-3 block text-sm text-dark dark:text-white"
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
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option defaultValue="">Choose Your Department</option>
                    <option value="Computer">Computer</option>
                    <option value="aiml">AIML</option>
                    <option value="ds">Computer Science & Engineering</option>
                    <option value="entc">
                      Electronics and Telecommunication
                    </option>
                  </select>
                </div>
                {/* PRN */}
                {user.role === "student" ? (
                  <div className="mb-8">
                    <label
                      htmlFor="prn"
                      className="mb-3 block text-sm text-dark dark:text-white"
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
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                ) : (
                  ""
                )}
                {/* Password */}
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    {" "}
                    Your Password{" "}
                  </label>
                  <OutlinedInput
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
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
                            <VisibilityOff />
                          ) : (
                            <Visibility />
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
                      <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
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
                              fill="#3056D3"
                              stroke="#3056D3"
                              strokeWidth="0.4"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <span>
                      By creating account means you agree to the
                      <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Terms and Conditions{" "}
                      </a>
                      , and our
                      <a href="#0" className="text-primary hover:underline">
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
                    className={`flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-submit-dark`}
                    onClick={handleSubmit}
                  >
                    Sign up
                  </button>
                </div>
                <p className="text-center text-base font-medium text-body-color">
                  Already using LG Data Dairies?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
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
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className={`contianer fixed inset-0 z-10 h-screen w-screen items-center justify-center gap-10 ${
            otpContainer ? "flex" : "hidden"
          }`}
        >
          <div className="relative flex h-1/3 w-1/3 flex-col items-center justify-between overflow-hidden rounded-xl border border-[rgba(44,48,59,0.3)] p-10 shadow-lg backdrop-blur-[5px] dark:bg-[rgba(44,48,59,0.57)] dark:shadow-[rgba(0,0,0,0.1)]">
            <button
              className="absolute right-0 top-0 flex h-1/6 w-1/12 items-center justify-center rounded-bl-2xl border-white bg-slate-200 pl-3 pt-2.5 dark:bg-body-color-dark"
              onClick={handleClose}
            >
              <svg
                className="block h-full w-full text-[#2C303B] dark:text-white"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
              >
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337" />
              </svg>
            </button>
            <h1>Verify Your Email</h1>
            <label
              htmlFor="name"
              className="mb-3 block text-sm text-dark dark:text-white"
            >
              Please Enter the OTP
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="otp"
                value={user.otp}
                onChange={(e) => setUser({ ...user, otp: e.target.value })}
                placeholder="Enter OTP"
                className="w-50 rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color"
              />
              <button
                className="w-50 rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-[#2C303B] outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color"
                onClick={otpContainerClose}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
