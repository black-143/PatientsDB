import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModeIcon from "@mui/icons-material/Mode";
import SearchIcon from "@mui/icons-material/Search";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AddPatient from "./AddPatient";
import SelectFile from "./SelectFile";

const drawerWidth = 240;

export default function SideBar() {
  const [currComponent, setCurrComponent] = React.useState("Add Patient");

  const mappingList = {
    "Add Patient": <AddPatient isSearchable={false} isEditable={true} />,
    "Edit Patient": <AddPatient isSearchable={true} isEditable={true} />,
    Search: <AddPatient isSearchable={true} isEditable={false} />,
    "Select File": <SelectFile />,
  };
  const iconsMapping = {
    "Add Patient": <PersonAddIcon />,
    "Edit Patient": <ModeIcon />,
    Search: <SearchIcon />,
    "Select File": <AddToDriveIcon />,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Patient Dashboard >>>> {currComponent}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Add Patient", "Edit Patient", "Search", "Select File"].map(
              (text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  onClick={() => setCurrComponent(text)}
                >
                  <ListItemButton>
                    <ListItemIcon>{iconsMapping[text]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        <Typography>{mappingList[currComponent]}</Typography>
      </Box>
    </Box>
  );
}
