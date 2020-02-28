import React from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";

const { TextArea } = Input;
const { Title } = Typography;

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
          <Dropzone onDrop maxSize multiple>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
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
