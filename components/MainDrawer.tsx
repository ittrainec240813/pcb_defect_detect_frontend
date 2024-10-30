import React from "react";
import { 
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  styled
} from "@mui/material";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';

interface MainDrawerProps extends DrawerProps {
  open: boolean;
  onSetDrawer: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MainDrawer:React.FC<MainDrawerProps> = ({ open, onSetDrawer }) => {
  const router = useRouter();

  const routes = [
    {
      title: "Home",
      icon: <HomeIcon sx={{color: "white", mr: "1px"}} />,
      route: "/"
    },
    {
      title: "Chat",
      icon: <ChatIcon sx={{color: "white", mr: "1px"}} />,
      route: "/rag"
    }
  ]

  const handleRouteChange = (newRoute: string) => {
    onSetDrawer();
    router.push(newRoute);
  }

  return (
    <Drawer 
      open={open} 
      sx={{
        width: "20%",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: "20%",        
          bgcolor: "#1d1d1d"
        },
      }}
      variant="persistent"
      anchor="left"
    >
      <List 
        sx={{width: "100%" }}
      >
        <DrawerHeader>
          <IconButton onClick={onSetDrawer}>
            <ChevronLeftIcon sx={{color: "white"}}/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        {routes.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleRouteChange(item.route)} >
              {item.icon}
              <ListItemText sx={{color: "#FFFFFF"}} primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default MainDrawer;