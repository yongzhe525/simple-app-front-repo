import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { getInfoName, infoPictureURL, putInfoPicture } from '../api/info';

const Info = () => {
  const [name, setName] = useState<string>();
  const [imageTimestamp, setImageTimestamp] = useState<number>(Date.now()); // imageTimestamp used for reload image

  useEffect(() => {
    getInfoName().then((response) => {
      setName(response.data.name)
    })
  }, []);

  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" >
        Infomation
      </Typography>
      <List>
        <ListItem>
          <img src={infoPictureURL + "?" + imageTimestamp} width={128} />
          <IconButton aria-label="upload picture" component="label" >
            <input hidden accept="image/png" type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
              // Get picture info
              let pictureFile = (e.currentTarget.files as FileList)[0]

              // Send picture
              let pictureForm = new FormData();
              pictureForm.append("file", pictureFile)
              putInfoPicture(pictureForm).then(() => {
                setImageTimestamp(Date.now())
              })
            }} />
            <PhotoCamera />
          </IconButton>
        </ListItem>
        <ListItem>
          <ListItemText primary={"Name: " + name} />
        </ListItem>
      </List>
    </Paper>
  )
}

export default Info;