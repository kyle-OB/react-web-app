import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Project 4
          </Typography>
          <Link to={`home`} ><Button color="inherit">Home</Button></Link>
          <Link to={`tasks`}><Button color="inherit">Tasks</Button></Link>
        </Toolbar>
      </AppBar>
      <Box>
      <Outlet />
      </Box>
    </>
  );
}

export default App;