

import axios from "axios";
import * as React from 'react';
import { useState, useEffect} from 'react';
import Video from './Video.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const debug = false;

const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});


function App() {
  const [apiTest, setApiTest] = useState(false)
  const [profile, setProfile] = useState(null)
  const [vid, setVid] = useState(null)
  const [videoId, setVideoId] = useState(null)
  useEffect(() => {
    // send HTTP request
    // save response to variable
    generateRandVid()
    console.log(vid)

}, [])

  function testApi() {
    axios({
      method: 'GET',
      url: "/test",
    })
    .then((response) => {
      const res = response.data
      if (res != null){
        setApiTest(true)
      }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    })
  }

  function getData() {
    axios({
      method: 'GET',
      url: "/profile",
    })
    .then((response) => {
      const res = response.data
      setProfile(({
        name: res.name,
        desc: res.desc
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    })

  }

  function generateRandVid() {
    axios({
      method: 'GET',
      url: "/randomvid",
    })
    .then((response) => {
      const res = response.data
      setVid(res)
      setVideoId(res['id']['videoId'])
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    })

  }
  console.log(profile)
  
  return (
    <>
    <CssBaseline />
    <head>
    <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
<meta name="viewport" content="initial-scale=1, width=device-width" />
    </head>
    <Container maxWidth="sm">
      <Stack  spacing={2} alignItems="center">
        <h1>Learn something new!</h1>
        {(vid != null) ? <h2>{vid['snippet']['title']}</h2> : <h2>Loading title...</h2>}
        {(debug && !apiTest) && <p>API failed</p>}
        {profile != null && <p>{profile.name}</p>}
        <Video videoId={videoId} debug={debug}/>
        <Button variant="outlined" onClick={() => generateRandVid()}>Learn something else!</Button>
    </Stack>
    </Container>
    

     
    </>
   
  );
}

export default App;
