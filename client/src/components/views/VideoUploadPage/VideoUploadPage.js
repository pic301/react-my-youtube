import React from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from 'axios'

const { TextArea } = Input;
const { Title } = Typography;


const onDrop = (files) =>{
  let formData = new FormData();
  const config = {
      header: {'content-type': 'multipart/form-data'}
  }
  formData.append("file", files[0])
  console.log(files)

  Axios.post('/api/video/uploadfiles',formData,config).then((response) => {
     if(response.data.success){
        console.log(response.data)
    } else{
      alert('비디오 업로드 실패')
    }
  })
}

const VideoUploadPage = () => {
  return (
    <div
       style={{
         maxWidth: "700px",
         margin: "2rem auto",
         border: "5px solid red"
       }}
     >
      <div style={{ textAlign: "center" }}>
        <Title levle={2}> Upload Video </Title>
      </div>
      <Form onSubmit>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* 드랍존 */}
          <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000000}
                    >
                        {
                            ({getRootProps,getInputProps}) => (
                                <div style={{width: '300px', height: '240px', border: '1px solid lightgray',display:"flex",
                                alignItems: 'center', justifyContent: 'center'}}{...getRootProps()}>
                                      <input {...getInputProps()}/>
                                      <Icon type="plus" style={{ fontSize: "3rem" }} />
                                </div>
                            )
                        }
                    </Dropzone>
          {/* 썸네일 */}
          <img src alt />
        </div>
        <br />
        <br />
        <label htmlFor="">Title</label>
        <Input onChange value />
        <label htmlFor="">Description</label>
        <TextArea onChange value />

        <br />
        <br />
        <select onChange>
          <option key value></option>
        </select>
        <br />
        <br />
        <select onChange>
          <option key value></option>
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick>
          submit
        </Button>
      </Form>
    </div>
  );
};

export default VideoUploadPage;


