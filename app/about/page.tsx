"use client"

import { Box,Tab, Tabs } from "@mui/material";
import aboutJson from "./about.json";
import React, { useState } from "react";
import styled from "@emotion/styled";

interface AboutContentItem {
  name: string;
  email?: string;
  github?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StyledContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
})

export default function About() {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const aboutTabs = aboutJson.contents.map(item => item.name)

  const aboutContentList: AboutContentItem[] = aboutJson.contents

  return (
    <StyledContainer>
      <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
        {aboutTabs.map((tab, index) => (
          <Tab sx={{color: "white"}} key={index} label={tab} value={index} />
        ))}
      </Tabs>
      <div>
        {aboutContentList.map((item, tabIndex) => (
          <CustomTabPanel value={currentTab} index={tabIndex} key={tabIndex}>
            <ul>
              {item.email ? <li>Email: {item.email}</li> : null}
              {item.github ? <li>GitHub: {item.github}</li> : null}
            </ul>
          </CustomTabPanel>
        ))}
      </div>
    </StyledContainer>
  )
}