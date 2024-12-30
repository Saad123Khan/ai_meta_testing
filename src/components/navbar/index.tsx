import {
  Avatar,
  Box,
  Divider,
  Grid,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  Toolbar,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
import CustomInputField from "../customInputField";
import { Search } from "lucide-react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 15,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "#672C70",
        color: "#fff",
      },
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
interface NavBarProps {
  open: any;
  setOpen: any;
}

function NavBar({ open, setOpen }: NavBarProps) {
  const router = useRouter();
  // const [cartDrawerState, setCartDrawerState] = useRecoilState(
  //   showSwipeableDrawerAtom
  // );
  // const { cartItem } = useCart();
  // const [userData, setUserData] = useRecoilState(userInfo);
  const userData = [
    {
      BussinessDetail: "abc",
      bnType: "abv",
    },
  ];

  const [notification, setNotification] = useState<any>([]);

  const [menuType, setMenuType] = useState<any>("profile");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notificatio = [
    "this is a message",
    "Hi this is a message 2!!",
    "Hi this is a notification!!",
  ];

  return (
    <>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        {/* {menuType == "profile" */}
        <MenuList>
          <MenuItem
            sx={{
              color: "#37474f",
              fontSize: "16px",
              fontWeight: "600",
              ml:2
              // pl: 1,
              // pb: 0,
              // pt: 0,
            }}
          >
            Notifications
          </MenuItem>
          {notificatio.map((data: any) => (
            <MenuItem className="mt-1 border-b border-[#6A6A6A]" >
              <>
                <Box sx={{ ml: 2, }}>
                  <p className="text-[#6A6A6A] text-[14px] font-semibold ">
                    Your Ad is revirewd
                  </p>
                  <p className="text-[#979797] text-[11px] font-semibold ">
                  You add is reviewd by meta check you approval bpx
                  </p>
                </Box>
              </>
            </MenuItem>
          ))}
          {/* <Divider sx={{ mt: 1 }} /> */}
        </MenuList>
      </StyledMenu>
      <Box>
        <AppBar
          elevation={0}
          open={open}
          sx={{
            backdropFilter: "blur(4px)",
            backgroundColor: "transparent",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left Section - Menu Icon */}
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  color: "#4c4e64de",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Center Section - Arrow Icons and Input Field */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <IconButton>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton>
                <KeyboardArrowRightIcon />
              </IconButton>
              <Box sx={{ mx: 2, flexGrow: 0.5 }}>
                {" "}
                <CustomInputField
                  css={
                    "bg-[#ffff] text-[#6B7280] active:border-none rounded-[16px]"
                  }
                  endIcon={true}
                  icon={<Search className="h-4 w-4 text-gray-500" />}
                  type={"text"}
                  placeholder={"Search"}
                />
              </Box>
            </Box>

            {/* Right Section - Message, Notification, Home Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  background: "#ffff",
                  color: "#242730",
                  padding: 1,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img src="/assets/msgIcon.png" width={22} height={22} />
                {/* <MessageOutlinedIcon sx={{ fontSize: 16 }} /> */}
              </Box>
              <Box
                sx={{
                  background: "#ffff",
                  color: "#242730",
                  padding: 1,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                <img src="/assets/notifIcon.png" width={22} height={22} />
                {/* <NotificationsOutlinedIcon sx={{ fontSize: 18 }} /> */}
              </Box>
              <Box
                sx={{
                  background: "#ffff",
                  color: "#242730",
                  padding: 1,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img src="/assets/homeIcon.png" width={22} height={22} />
                {/* <HomeIcon sx={{ fontSize: 18 }} /> */}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;
