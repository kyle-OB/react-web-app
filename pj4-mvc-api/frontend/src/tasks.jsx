import { Typography, Box, Grid, Card, CardHeader, Avatar, CardContent } from '@mui/material';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { grey } from '@mui/material/colors';


function Tasks() {
  const [taskTypes, setTaskTypes] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const typeResponse = await axios.get('http://localhost:3000/api/task-types', { cancelToken: source.token });
        setTaskTypes(typeResponse.data);


        const taskResponse = await axios.get('http://localhost:3000/api/task', { cancelToken: source.token });
        setTasks(taskResponse.data);
      } catch (error) {
        console.log(error);
      }
    };


    fetchData();


    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  const requestInsert = async (name) => {
    try {
        const taskResponse = await axios.post(`http://localhost:3000/api/tasks`,{'name':name});
        setTasks(taskResponse.data);
    } catch (error) {
        console.error('There was an error adding the item', error);
    }
  }; 

 
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    requestInsert(name)
      .then(()=>{
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Drag and Drop functions
  const handledragover = (event) => {
    event.preventDefault();
  };

 

  const handledrag = (event) => {
    event.dataTransfer.setData("task_id", event.target.attributes.task_id.value);
  };


  if (!tasks) {
    return (
      <Box width="100%" color="black" sx={{ marginTop: "80px" }}>
        Loading ...
      </Box>
    );
  }


  return (
    <Box height="calc(100vh - 100px)" width="100%" sx={{ marginTop: "80px" }}>      
      <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 28, right: 20 }} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      
     

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add a Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


export default Tasks;
