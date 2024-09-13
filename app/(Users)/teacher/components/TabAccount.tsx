// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

// ** Icons Imports
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState(
    "https://unsplash.com/s/photos/random-people",
  );
  const [button, setButton] = useState("Edit Profile");
  const [user, setUser] = useState<any>(null);
  const [edit, setEdit] = useState(true);
  const [appPassword, setAppPassword] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [sortedStudents, setSortedStudents] = useState<any[]>([]);

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(User);
    if (User.studentUnder) {
      setStudents(User.studentUnder);
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const temp = [...students].sort((a, b) => {
        // Check if PRN is defined and compare
        if (a.prn && b.prn) {
          if (a.prn < b.prn) return -1;
          if (a.prn > b.prn) return 1;
        }
        return 0;
      });
      setSortedStudents(temp);
    }
  }, [students]);

  const handleEdit = async () => {
    if (button === "Save Changes") {
      setButton("Edit Profile");
      try {
        const token = Cookies.get("token");
        const payload: any = {
          fullName: user.fullName,
          mailEmail: user.mailEmail,
          token,
        };
        if (appPassword) {
          payload.appPassword = appPassword;
        }
        const response = await axios.patch(
          "http://localhost:5000/api/v1/update-info/update-user-details",
          payload,
        );
        toast.promise(
          Promise.resolve(response.data),
          {
            loading: "Updating Your Info...",
            success: "Information Updated",
            error: "Failed to update",
          },
          {
            success: { duration: 2000, icon: "👏🏻" },
            error: { duration: 2000, icon: "😞" },
          },
        );
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
        }
        setEdit(true);
      } catch (err) {
        toast.error("Couldn't update your info");
      }
    } else {
      setButton("Save Changes");
      setEdit(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImgSrc(e.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    user && (
      <CardContent className="bg-transparent">
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ImgStyled src={imgSrc} alt="Profile Pic" />
                <Box>
                  <ButtonStyled variant="contained">
                    Upload New Photo
                    <input
                      hidden
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      setImgSrc(
                        user ? user.profilePic : "/images/avatars/1.png",
                      )
                    }
                  >
                    Reset
                  </ResetButtonStyled>
                  <Typography variant="body2" sx={{ marginTop: 5 }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                value={user?.userName || "Something Went Wrong"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={edit}
                fullWidth
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                label="Name"
                value={user?.name || "Something Went Wrong"}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={true}
                fullWidth
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                type="email"
                label="Email"
                value={user?.email || "Something Went Wrong"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={edit}
                fullWidth
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                type="email"
                label="Mail-Email"
                value={user?.mailEmail || "Something Went Wrong"}
                onChange={(e) =>
                  setUser({ ...user, mailEmail: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={true}
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                fullWidth
                label="Verified"
                value={user?.isVerified ? "Verified" : "Not Verified"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={edit}
                fullWidth
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                label="App Password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={true}
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
                fullWidth
                label="Department"
                value={user?.department || "No department specified"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={true}
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md capitalize"
                fullWidth
                label="Role"
                value={user?.role || "No role specified"}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ marginRight: 3.5 }}
                onClick={handleEdit}
              >
                {button}
              </Button>
              <Button type="reset" variant="outlined" color="secondary">
                Reset
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                className="text-dark dark:text-white"
              >
                List of Students
              </Typography>
              <List>
                {sortedStudents.map((student) => (
                  <ListItem
                    key={student._id}
                    className="my-3 flex items-end justify-center rounded-md bg-slate-200 text-gray-700 dark:bg-[#4b5563] dark:text-gray-300"
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={student.name}
                        src={student.profileImageUrl || "/images/avatars/1.png"}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={student.email}
                      secondaryTypographyProps={{
                        className: "text-gray-500 dark:text-gray-400",
                      }}
                      className="rounded-md text-gray-700 dark:text-gray-300"
                    />
                    <ListItemText primary={student.prn} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    )
  );
};

export default TabAccount;
