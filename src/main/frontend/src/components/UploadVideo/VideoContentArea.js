import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./VideoContentArea.css";
import VideoCard from "./VideoCard.js";

import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';


const paperStyle = (theme) => ({
  flex: 3,
  height: '100%',
  padding: 2,
  bgcolor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  borderRadius: 2,
  margin: 2,
});

const VideoContentArea = ({ playList, index, selectedItem }) => {
    const theme = useTheme();
    const {state} = useLocation();
    const playerRef = useRef(null);

    useEffect(() => {
        if (selectedItem && playerRef.current) {
            const timeString = selectedItem.time;
                if (timeString) {
                    const [minutes, seconds] = timeString.split(':').map(Number);
                    const totalTimeInSeconds = minutes * 60 + seconds;
                    playerRef.current.seekTo(totalTimeInSeconds);
                }
        }
    }, [selectedItem]);

    return (
        <Paper sx={paperStyle(theme)}>
            <div className="v-cont">
                <VideoCard video={state.video} playerRef={playerRef}/>
                <div>{state.detail}</div>

                <div>
                    {selectedItem &&
                        <div>
                            <Divider style={{background: "#9797973D", marginTop:"20px",marginBottom:"20px"}}/>
                            <div>{selectedItem.details}</div>
                        </div>
                    }
                </div>
            </div>
        </Paper>
    );
}

export default VideoContentArea;