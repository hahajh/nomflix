import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const VideoContainer = styled.div`    
`;

const VideoItem = styled.div`
    cursor: pointer;
    margin-bottom: 5px;    
    font-size: 12px;
    opacity: 0.8;
`;

const Video = styled.div`
    margin: 10px 0px;
`;

const DetailVideo = (props) => {
    const [state, setState] = useState(props.video);
    const [video, setVideo] = useState('');
    const opts = {
        height: '300',
        width: '450',
        playerVars: {
            autoPlay: 1
        }
    }

    const SelectVideo = (item) => {
        setVideo(item.key);
    }

    useEffect(()=> {
        
    }, [])
    
    return (
        <VideoContainer>
            {state && state.map((v) => <VideoItem key={v.id} onClick={() => SelectVideo(v)}>• {v.name}</VideoItem>)}
            <Video>
                {video && <YouTube videoId={video} opts={opts}></YouTube>}
            </Video>
        </VideoContainer>
    )
}

export default DetailVideo;

