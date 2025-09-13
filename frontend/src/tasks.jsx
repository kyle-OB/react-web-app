import { Typography, Box } from '@mui/material';
import './App.css';


import { useEffect, useState } from 'react';




function tasks() {
  const [taskTypes, setTaskTypes] = useState(null);
  const [tasks, setTasks] = useState(null);




useEffect(() => {
  const source = axios.CancelToken.source();
  const fetchData = async () => {
      try {
          const typeResponse = await axios.get('http://localhost:3000/api/task-types', { cancelToken: source.token });
          setTaskTypes(typeResponse.data);      


          const taskResponse = await axios.get('http://localhost:3000/api/tasks', { cancelToken: source.token });
          setTasks(taskResponse.data);
      } catch (error) {
          console.log(error);
      }
  };


  fetchData();
 
  return () => {
    source.cancel('Operation canceled by the user.');
  };
},[]);
}

//Drag and Drop functions
const handledragover = (event) => {
  event.preventDefault();
};


const handledrop = (event) => {
  event.preventDefault();
  const task_id = event.dataTransfer.getData("task_id");
  const type_id = event.target.attributes.type_id.value;


  setTasks((tasks)=>
    tasks.map(task=>
      task.id==task_id?{...task, type_id:type_id}:task
    )
  );
};


const handledrag = (event) => {
  event.dataTransfer.setData("task_id", event.target.attributes.task_id.value);
};
 

const App = () => {
  if(!tasks) return (
    <Box width="100%" sx={{ marginTop: "80px" }}>
      Loading ...
    </Box>
  );
 
  return (
    <Box maxWidth="xl" height="100vh" display="flex" flexDirection="column" justifyContent="center">
    <Typography variant="h1" align="left" color="#000000">
    <div class="container-fluid">
<div class="card">
  <div class="card-body">
    <h1>New Tasks</h1>
    <h2 class="card-title">ReactJS</h2>
  </div>
</div>
</div>

<div class="container-fluid">
<div class="card">
  <div class="card-body2">
    <h1>In Progress</h1>
    <h2 class="card-title">JavaScript</h2>
  </div>
</div>
</div>

<div class="container-fluid">
<div class="card">
  <div class="card-body3">
    <h1>Completed</h1>
    <h2 class="card-title">HTML</h2>
    <h2 class="card-title">CSS</h2>
  </div>
</div>
</div>
    </Typography>
</Box>
  );
};


export default App;
