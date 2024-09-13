"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-hot-toast";

const initialSemester = {
  semesterNumber: "",
  termTests: [{ testNumber: "", marks: "" }],
  endSemesterMarks: "",
  attendance: "",
};

const EngineeringDetailsPage: React.FC = () => {
  const [semesters, setSemesters] = useState<Array<typeof initialSemester>>([
    initialSemester,
  ]);

  const handleAddSemester = () => {
    if (semesters.length < 8) {
      setSemesters([...semesters, { ...initialSemester }]);
    } else {
      toast.error("Maximum of 8 semesters allowed.");
    }
  };

  const handleRemoveSemester = (index: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((_, i) => i !== index));
    } else {
      toast.error("At least one semester is required.");
    }
  };

  const handleChangeSemester = (index: number, field: string, value: any) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index] = { ...updatedSemesters[index], [field]: value };
    setSemesters(updatedSemesters);
  };

  const handleChangeTermTest = (
    semesterIndex: number,
    testIndex: number,
    field: string,
    value: any,
  ) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].termTests[testIndex] = {
      ...updatedSemesters[semesterIndex].termTests[testIndex],
      [field]: value,
    };
    setSemesters(updatedSemesters);
  };

  const handleAddTermTest = (index: number) => {
    const updatedSemesters = [...semesters];
    if (updatedSemesters[index].termTests.length < 2) {
      updatedSemesters[index].termTests.push({ testNumber: "", marks: "" });
      setSemesters(updatedSemesters);
    } else {
      toast.error("Maximum of 2 term tests allowed per semester.");
    }
  };

  const handleRemoveTermTest = (semesterIndex: number, testIndex: number) => {
    const updatedSemesters = [...semesters];
    if (updatedSemesters[semesterIndex].termTests.length > 1) {
      updatedSemesters[semesterIndex].termTests.splice(testIndex, 1);
      setSemesters(updatedSemesters);
    } else {
      toast.error("At least one term test is required.");
    }
  };

  const handleSave = async () => {
    // Implement your save functionality here
    try {
      // const response = await axios.post("/api/saveEngineeringDetails", { semesters });
      // toast.success("Engineering details saved successfully.");
    } catch (error) {
      toast.error("Error saving engineering details.");
      console.error("Error saving engineering details:", error);
    }
  };

  return (
    <Box p={4} className="rounded-lg bg-white shadow-md dark:bg-gray-800">
      <Typography variant="h4" mb={4} className="dark:text-white">
        Engineering Details
      </Typography>
      {semesters.map((semester, semesterIndex) => (
        <Box
          key={semesterIndex}
          mb={4}
          p={2}
          className="rounded-md border border-gray-300 dark:border-gray-600"
        >
          <Typography variant="h6" mb={2} className="dark:text-white">
            Semester {semesterIndex + 1}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="End Semester Marks"
                fullWidth
                value={semester.endSemesterMarks}
                onChange={(e) =>
                  handleChangeSemester(
                    semesterIndex,
                    "endSemesterMarks",
                    e.target.value,
                  )
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputProps={{ className: "rounded-md" }}
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Attendance"
                fullWidth
                value={semester.attendance}
                onChange={(e) =>
                  handleChangeSemester(
                    semesterIndex,
                    "attendance",
                    e.target.value,
                  )
                }
                className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                InputProps={{ className: "rounded-md" }}
                InputLabelProps={{
                  className: "text-gray-700 dark:text-gray-300",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mb={2} className="dark:text-white">
                Term Tests
              </Typography>
              {semester.termTests.map((test, testIndex) => (
                <Box
                  key={testIndex}
                  mb={2}
                  p={2}
                  className="rounded-md border border-gray-300 dark:border-gray-600"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Test Number"
                        fullWidth
                        value={test.testNumber}
                        onChange={(e) =>
                          handleChangeTermTest(
                            semesterIndex,
                            testIndex,
                            "testNumber",
                            e.target.value,
                          )
                        }
                        className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                        InputProps={{ className: "rounded-md" }}
                        InputLabelProps={{
                          className: "text-gray-700 dark:text-gray-300",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Marks"
                        fullWidth
                        value={test.marks}
                        onChange={(e) =>
                          handleChangeTermTest(
                            semesterIndex,
                            testIndex,
                            "marks",
                            e.target.value,
                          )
                        }
                        className="bg-gray-50 dark:bg-gray-600 dark:text-white"
                        InputProps={{ className: "rounded-md" }}
                        InputLabelProps={{
                          className: "text-gray-700 dark:text-gray-300",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <IconButton
                    onClick={() =>
                      handleRemoveTermTest(semesterIndex, testIndex)
                    }
                    color="error"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                onClick={() => handleAddTermTest(semesterIndex)}
                startIcon={<AddIcon />}
                color="primary"
              >
                Add Term Test
              </Button>
            </Grid>
          </Grid>
          <IconButton
            onClick={() => handleRemoveSemester(semesterIndex)}
            color="error"
          >
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        onClick={handleAddSemester}
        startIcon={<AddIcon />}
        color="primary"
        className="mb-4"
      >
        Add Semester
      </Button>
      <Button onClick={handleSave} variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default EngineeringDetailsPage;
