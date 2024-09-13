"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab from "@mui/material/Tab";
import React, { useState } from "react";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import TabAccount from "../components/TabAccount";
import { EngineOutline, ProjectorScreenOffOutline } from "mdi-material-ui";
import TabEngineeringDetails from "../components/TabEngineeringDetails";
import PortfolioAndHealthDetailsPage from "../components/ProtfolioDetails";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

function details() {
  const [value, setValue] = useState("account");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=" bg-transparent p-3 dark:text-white">
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="account"
            className="text-dark dark:text-gray-light"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value="security"
            className="text-dark dark:text-gray-light"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EngineOutline />
                <TabName>Engineering Details</TabName>
              </Box>
            }
          />
          <Tab
            value="info"
            className="text-dark dark:text-gray-light"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ProjectorScreenOffOutline />
                <TabName>Protfolio Details</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="account">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="security">
          <TabEngineeringDetails />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="info">
          <PortfolioAndHealthDetailsPage />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default details;
