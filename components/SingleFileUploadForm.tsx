import React, { useState, useEffect } from "react";
import { Form, Input, Card, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import uploadFileToBlob, { BlobData } from "../lib/storage";

const FormItem = Form.Item;

const SingleFileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [blobs, setBlobs] = useState<BlobData[]>([]);

  const handleFileChange = (info: any) => {
    setFile(info.file);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blobs: BlobData[] = await uploadFileToBlob(file);
      setBlobs(blobs);
      console.log(blobs);
    } catch (e) {
      console.error(e);
    }

    message.success(`The document was uploaded successfully!`);
    onReset();
  };

  return (
    <Card style={{ width: 400, margin: "0 auto" }}>
      <Form form={form} onSubmitCapture={handleSubmit}>
        <FormItem label="Upload a .rtf or .docx file">
          <Upload
            name="file"
            accept=".rtf,.docx"
            onChange={handleFileChange}
            showUploadList={false}
            beforeUpload={() => false}
          >
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
          {/* <span>
            <FilePdfTwoTone style={{ marginLeft: "10px", fontSize: 16 }} />
          </span> */}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={!file}>
            Upload
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default SingleFileUploadForm;
