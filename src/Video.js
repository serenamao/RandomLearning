
import './App.css';
import { useState, useEffect} from 'react';
import YouTube from 'react-youtube';

function App({videoId, debug}) {
    const [vid, setVid] = useState(null);


  return (
    <>
     {debug && <p>This is the video component</p>}
     {videoId != null ? 
     <YouTube 
        videoId={videoId}/>
     : 
     <p>Loading video...</p>}

     
    
    </>
   
  );
}

export default App;
