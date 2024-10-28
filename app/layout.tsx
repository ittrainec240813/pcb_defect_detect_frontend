"use client"

import { useState } from "react";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import MainDrawer from "@/components/MainDrawer";
import { Box, styled } from "@mui/material";

interface MainContainerProps {
  open?: boolean;
}

const MainContainer = styled(Box)<MainContainerProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: "80%",
        marginLeft: "20%",
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const handleDrawer = () => {
    setShowDrawer(prev => !prev);
  }

  return (
    <html lang="en">
      <body>
        <MainDrawer open={showDrawer} onSetDrawer={handleDrawer}/>
        <MainContainer open={showDrawer}>
          <AppHeader onSetDrawer={handleDrawer} />
          {children}
        </MainContainer>
      </body>
    </html>
  );
}
