import React, { useEffect,useState } from 'react';
import {Row,Col, List,Avatar, Button} from 'antd'
import Axios from 'axios';
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'

const VideoDetailPage = (props) => {
    const videoId = props.match.params.videoId
    const variable ={videoId: videoId}
    const [VideoDetail,setVideoDetail] = useState([])

    useEffect(() =>{
        Axios.post('/api/video/getVideoDetail',variable)
        .then(res =>{
            if(res.data.success){
                console.log(res.data)
                setVideoDetail(res.data.videoDetail)
            }else{
                alert("비디오정보 가져오기 실패")
            }
        })
    }
    ,[]) 
    console.log(VideoDetail)
    if(VideoDetail.writer){
        return (
            <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
                <div>
                    <video style={{width:"100%"}}src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                    <List.Item actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/> ]}>
                    <List.Item.Meta avatar={<Avatar 
                    src={VideoDetail.writer.image}/>} 
                    title={VideoDetail.writer.name} 
                    description={VideoDetail.description}/>
                    </List.Item >
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo/>
            </Col>
        </Row>
        );
    }else{
        return <div>...loading</div>
    }
};

export default VideoDetailPage; 