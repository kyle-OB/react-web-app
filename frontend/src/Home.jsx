import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box maxWidth="xl" height="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h1" align="center" color="#000000">
            HOME
        </Typography>
        <Typography variant="body1" align="center" color="#000000">
            This is a React application using Vite and Material-UI.
            
        </Typography>
    </Box>
  );
}

export default Home;