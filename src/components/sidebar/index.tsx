"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Avatar, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "../navbar";
import CloseIcon from "@mui/icons-material/Close";
import getNavigationArray from "./drawerContent";
import { useSelector } from "react-redux";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

const scrollbarStyles = (theme: any) => ({
  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  overflowY: "auto",
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: "#888 transparent", // For Firefox
  "&::-webkit-scrollbar": {
    width: "6px",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// const useStyles = makeStyles({
//   active:{
//       color: "white",
//       background: "#003e29"
//     },
//      nonActive:{
//       color: "black",

//     },
//   }
// )

// const classes = useStyles();

export default function SideBar(props: any) {
  const router = useRouter();
  const theme = useTheme();

  let { user } = useSelector((store: any) => store.user);
  const [open, setOpen] = React.useState(true);
  const currentpathname = usePathname();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const [activeDropDown, setActiveDropDown] = React.useState<number[]>([]);
  const Navigation = getNavigationArray();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = (key: number) => {
    setMobileOpen(false);
    if (activeDropDown.includes(key)) {
      setActiveDropDown([...activeDropDown.filter((e) => e !== key)]);
    } else {
      setActiveDropDown([...activeDropDown, key]);
    }
  };

  const navigationdone = (path: string) => {
    router.push(path);
  };
  React.useEffect(() => {
    if (isMobileOrTablet) {
      // Close the sidebar if the screen size is mobile or tablet
      handleDrawerClose();
    } else {
      // Open the sidebar if the screen size is larger
      handleDrawerOpen();
    }
  }, [isMobileOrTablet]);

  const mobileDrawer = (
    <Box
      onClick={handleDrawerToggle}
      style={{ textAlign: "center", overflowY: "auto" }}
      sx={scrollbarStyles}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="flex">
          <Avatar
            variant="rounded"
            src={"/assets/Foto Devon Lane.png"}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
          >
            <p>{user?.name}</p>
            <p className="text-[12px]">Social Media Specialist</p>
          </Box>
        </div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2 }}
        >
          <CloseIcon sx={{ color: "#37474F" }} />
        </IconButton>
      </Box>
      {Navigation?.map((item: any, key) => (
        <List className="mt-2">
          <ListItemButton
            sx={{
              borderRadius: 8,
              ml: 2,
              background:
                currentpathname === item.path
                  ? "linear-gradient(162deg, rgba(187,208,252,1) 0%, rgba(197,217,253,1) 93%)"
                  : "transparent",
              color: currentpathname === item.path ? "#242730" : "#ffff",
              "&:hover": {
                background: "#5000FF",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
            onClick={
              item.children?.length > 0
                ? () => handleClick(key)
                : () => navigationdone(item.path)
            }
          >
            <ListItemIcon
              sx={{
                color: currentpathname === item.path ? "#242730" : "#ffff",
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{ opacity: mobileOpen ? 1 : 0, color: "inherit" }}
            />{" "}
            {item.children?.length > 0 ? (
              activeDropDown.includes(key) ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon sx={{ opacity: mobileOpen ? 1 : 0 }} />
              )
            ) : (
              <></>
            )}
          </ListItemButton>

          {item.children?.length > 0 ? (
            <Collapse
              in={activeDropDown.includes(key)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.children.map((val: any) => (
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        background: "#5000FF",
                        color: "#fff",
                        "& .MuiListItemIcon-root": {
                          color: "#fff",
                        },
                      },
                      background:
                        currentpathname === val.path
                          ? "linear-gradient(162deg, rgba(187,208,252,1) 0%, rgba(197,217,253,1) 93%)"
                          : "transparent",
                      color: currentpathname === val.path ? "#001882" : "#ffff",
                      pl: 4,
                      borderRadius: 8,
                      ml: 2,
                      mr: 2,
                    }}
                    onClick={() => navigationdone(val.path)}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          currentpathname === val.path ? "#001882" : "#ffff",
                        minWidth: 0,
                        mr: 3,
                        justifyContent: "center",
                      }}
                    >
                      {val.icon}
                    </ListItemIcon>
                    <ListItemText primary={val.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          ) : (
            <></>
          )}
        </List>
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar
        open={open}
        setOpen={isMobileOrTablet ? setMobileOpen : setOpen}
      />
      {/* <CartDrawer /> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            background:
              "linear-gradient(180deg, rgba(115,141,254,1) 0%, rgba(108,133,242,1) 62%, rgba(241,222,254,1) 100%)",
            width: drawerWidth,
            boxSizing: "border-box",
            overflow: "hidden",
            color: "#ffff",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            mt: 4,
            mb: 2,
          }}
        >
          <Avatar
            variant="rounded"
            src={"/assets/Foto Devon Lane.png"}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <p>{user?.name}</p>
            <p className="text-[12px]">Social Media Specialist</p>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Box  className="pt-[70px]" sx={scrollbarStyles}>
          {Navigation?.map((item: any, key: any) => (
            <List >
              <ListItemButton
                sx={{
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  ml: 2,
                  background:
                    currentpathname === item.path
                      ? "linear-gradient(162deg, rgba(187,208,252,1) 0%, rgba(197,217,253,1) 93%)"
                      : "transparent",
                  color: currentpathname === item.path ? "#242730" : "#ffff",
                  "&:hover": {
                    background: "#5000FF",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
                onClick={
                  item.children?.length > 0
                    ? () => handleClick(key)
                    : () => navigationdone(item.path)
                }
              >
                <ListItemIcon
                  sx={{
                    color: currentpathname === item.path ? "#242730" : "#ffff",
                    // color: "#37474F",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0, color: "inherit" }}
                />{" "}
                {/* Set color: inherit to inherit the hover color */}
                {item.children?.length > 0 ? (
                  activeDropDown.includes(key) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon sx={{ opacity: open ? 1 : 0 }} />
                  )
                ) : (
                  <></>
                )}
              </ListItemButton>

              {item.children?.length > 0 ? (
                <Collapse
                  in={activeDropDown.includes(key)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((val: any) => (
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            background: "#5000FF",
                            color: "#fff",
                            "& .MuiListItemIcon-root": {
                              color: "#fff",
                            },
                          },
                          background:
                            currentpathname === val.path
                              ? "linear-gradient(162deg, rgba(187,208,252,1) 0%, rgba(197,217,253,1) 93%)"
                              : "transparent",
                          color:
                            currentpathname === val.path ? "#001882" : "#ffff",
                          pl: 4,
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                          ml: 2,
                          // mr: 2,
                        }}
                        onClick={() => navigationdone(val.path)}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              currentpathname === val.path
                                ? "#001882"
                                : "#ffff",
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {val.icon}
                        </ListItemIcon>
                        <ListItemText primary={val.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              ) : (
                <></>
              )}
            </List>
          ))}
        </Box>
      </Drawer>

      <nav>
        <SwipeableDrawer
          disableSwipeToOpen={false}
          swipeAreaWidth={10}
          sx={{
            "& .MuiDrawer-paper": {
              background:
                "linear-gradient(180deg, rgba(115,141,254,1) 0%, rgba(108,133,242,1) 62%, rgba(241,222,254,1) 100%)",
              width: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
              padding: 2,
              color: "#ffff",
            },
          }}
          anchor={"top"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
        >
          {mobileDrawer}
        </SwipeableDrawer>
      </nav>

      <Main open={open} sx={{ overflowX: "hidden" }}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
