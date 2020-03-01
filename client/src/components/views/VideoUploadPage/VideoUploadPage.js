import React ,{useState} from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from 'axios'

const { TextArea } = Input;
const { Title } = Typography;





const VideoUploadPage = () => {
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState('')


const onDrop = (files) =>{
  let formData = new FormData();
  const config = {
      header: {'content-type': 'multipart/form-data'}
  }
  formData.append("file", files[0])
  console.log(files)

  Axios.post('/api/video/uploadfiles',formData,config).then((res) => {
     if(res.data.success){
        console.log(res.data)

        let variable = {
          url:res.data.url,
          fileName:res.data.fileName
        }
        setFilePath(res.data.url)
        Axios.post('/api/video/thumbnail',variable).then(res =>{
          if(res.data.success){
            setDuration(res.data.fileDuration)
            setThumbnailPath(res.data.url)
            console.log(res.data)
          }else{
            alert('썸네일 생성에 실패하였습니다')
          }
        })

    } else{
      alert('비디오 업로드 실패')
    }
  })
}
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
          <img src={`http://localhost:5000/${ThumbnailPath}`} alt />
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


