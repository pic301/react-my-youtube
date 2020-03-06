import React,{useEffect,useState} from 'react';
import Axios from 'axios'

const SideVideo = () => {
    
    const [sideVideos, setSideVideos] = useState([])

    useEffect(()=>{
        Axios.get('/api/video/getVideos').then(
            res => {
                if(res.data.success){
                    setSideVideos(res.data.videos)
                }else{
                    alert("비디오 가져오기실패")
                }
            }
        )
    },[])

    const renderSideVideos = sideVideos.map((video,i) =>{

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return(
            <div key={i} style={{ display: 'flex' , marginBottom:"1rem", padding: '0 2rem'}}>
            <div style={{ width: '40%', marginBottom: "1rem"}}>
                <a href="">
                    <img style={{width:"100%", height:"100%"}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                </a> 
            </div> 
            <div style={{ width: '50%'}}>
                <a href style={{ color:"gray"}}>
                    <span style={{ fontSize: '1rem', color:'black'}}> {video.title}</span><br/>
                    <span>{video.writer.name}</span><br/>
                    <span>{video.views} views</span><br/>
                    <span>{minutes} : {seconds}</span><br/>
                    
                </a>
            </div>
        </div>
        )
    })

    return (
        <>
        <div style={{marginTop:"3rem"}}/>
        {renderSideVideos}
        </>


       
    );
};

export default SideVideo;