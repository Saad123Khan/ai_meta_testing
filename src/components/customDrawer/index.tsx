"use client";

import * as React from "react";
import { ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import CustomInputField from "../customInputField";
import CustomSelectField from "../customSelectField";
import CustomTextArea from "../customTextArea";
import { Box, BoxProps, Divider, styled, SwipeableDrawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ScrollArea } from "@/components/ui/scroll-area";

interface customDrawerProps {
  drawerPageContent: any;
  open: boolean;
  setOpenDrawer: (open: boolean) => void;
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: 2,
  justifyContent: "space-between",
  backgroundColor: "#f7f7f9",
}));
const CustomDrawer = ({
  drawerPageContent,
  open,
  setOpenDrawer,
}: customDrawerProps) => {
  return (
    <>
      <SwipeableDrawer
        disableSwipeToOpen={false}
        swipeAreaWidth={10}
        sx={{
          "& .MuiDrawer-paper": {
            background: "#f7f7f9",
            width: { xs: 350, sm: 450 },
            borderTopLeftRadius: "18px",
            borderBottomLeftRadius: "18px",
            boxSizing: "border-box",
            boxShadow: "4px 0px 5px rgba(136, 136, 136, 0.5)",
            overflow: "hidden",
            padding: 2,
          },
        }}
        anchor={"right"}
        open={open}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        {drawerPageContent}

      </SwipeableDrawer>
    </>
  );
};

export default CustomDrawer;
