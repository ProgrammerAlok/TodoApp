import {cloneElement, React, useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, CircularProgress, TextField } from '@mui/material';
import { axiosInstnce, endpoints } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function generate(data, element) {
  return data.map(({title}) =>
    cloneElement(element, {
      key: title,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Todo() {
  const navigate = useNavigate();
  const { user, setUser, isLoading, setIsLoading } = useAuth();

  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  

  async function handleAddTodo () {
    const res = await axiosInstnce.post(endpoints.todo.add, {title: newTodo});
    const { data, success } = res.data;
    if(success) {
      setNewTodo('');
      setTodos(t => [...t, data]);
    }
  }

  async function handleDeleteTodo (id) {
    const res = await axiosInstnce.delete(`${endpoints.todo.delete}/${id}`);
    const { success } = res.data;
    if(success) {
      setTodos(todos.filter(t => t._id !== id));
    }
  }

  async function handleLogout() {
    const res = await axiosInstnce.get(endpoints.auth.logout);
    const { success } = res.data;
    setIsLoading(true);
    if(success) {
      setUser(null);
      navigate('/login');
    }
    setIsLoading(false);
  }


  useEffect(() => {
    if(isLoading) return;

    if(!user) return navigate('/login');
    
    (async()=>{
        const res = await axiosInstnce.get(endpoints.todo.get);
        const {data} = res.data;
        setTodos(data)
    })()
  }, [user, isLoading])

  if(isLoading || !user) return <CircularProgress />

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, mx: 'auto' }}>
        <Button variant="contained" sx={{ mx: 'auto' }} onClick={handleLogout}>Logout</Button>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            You have {todos.length} todos
          </Typography>
          <Demo>
            <List dense={dense}>
              {todos.length > 0 ?  todos.map(({ title, _id: id, }, ind) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  key={ind}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={title}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              )) : "no data found..."}
            </List>
          </Demo>
        </Grid>

        <Box sx={{
            display: 'flex'
        }}>
            <TextField id="outlined-basic" label="Enter Todo" variant="outlined" sx={{width: '100%'}} value={newTodo} onChange={e => setNewTodo(e.target.value)} />
            <Button onClick={handleAddTodo} variant="outlined">SUBMIT</Button>
        </Box>
    </Box>
  );
}