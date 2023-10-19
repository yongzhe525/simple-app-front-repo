import { useEffect, useRef, useState } from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

import { listHobby, createHobby, deleteHobby } from '../api/hobby';

const Hobby = () => {
  const [hobbies, setHobbies] = useState<{ id: number, name: string }[]>([]);
  const createHobbyRef = useRef<TextFieldProps>(null);

  useEffect(() => {
    listHobby().then((response) => {
      setHobbies(response.data)
    })
  }, []);

  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" >
        Hobby
      </Typography>
      <List>
        <ListItem
          secondaryAction={
            <IconButton edge="end" onClick={
              (e) => {
                if (createHobbyRef.current) {
                  createHobby(createHobbyRef.current.value as string)
                    .then(() => {
                      listHobby()
                        .then((response) => {
                          setHobbies(response.data)
                        })
                    })
                  createHobbyRef.current.value = ""
                }
              }
            } >
              <AddBoxIcon />
            </IconButton>
          }>
          <TextField inputRef={createHobbyRef} label="Create" variant="outlined" sx={{ width: "100%" }} />
        </ListItem>
        {hobbies.map((hobby) => (
          <ListItem
            key={hobby.id}
            secondaryAction={
              <IconButton edge="end" onClick={
                (e) => {
                  deleteHobby(hobby.id)
                    .then(() => {
                      listHobby()
                        .then((response) => {
                          setHobbies(response.data)
                        })
                    })
                }
              }>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={hobby.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default Hobby;