import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ListItemSecondaryAction } from '@mui/material';
import './style.css'

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={'3D Plot'} disablePadding>
            <ListItemButton onClick={(event) => {
                  props.scrollTo('3D')
                  props.setToggle(!props.toggle);
                }}>
              <ListItemIcon>
              <img className={'icon-img'} src={require('../assets/scatter-plot24.png')}/>
              </ListItemIcon>
              <ListItemText primary={'3D Plot'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Statistic Feature'} disablePadding>
            <ListItemButton onClick={(event) => {
                  props.scrollTo('stat-table')
                  props.setToggle(!props.toggle);
                }}>
              <ListItemIcon>
              <img className={'icon-img'} src={require('../assets/table24.png')}/>
              </ListItemIcon>
              <ListItemText primary={'Statistic Feature'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Confusion Matrix'} disablePadding>
            <ListItemButton onClick={(event) => {
                  props.scrollTo('matrix')
                  props.setToggle(!props.toggle);
                }}>
              <ListItemIcon>
              <img className={'icon-img'} src={require('../assets/evaluation24.png')}/>
              </ListItemIcon>
              <ListItemText primary={'Confusion Matrix'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Charts'} disablePadding>
            <ListItemButton onClick={(event) => {
                  props.scrollTo('line1')
                  props.setToggle(!props.toggle);
                }}>
              <ListItemIcon>
              <img className={'icon-img'} src={require('../assets/stats24.png')}/>
              </ListItemIcon>
              <ListItemText primary={'Charts'} />
            </ListItemButton>
          </ListItem>
          
        </List>
        
      </Drawer>
    </Box>
  );
}
