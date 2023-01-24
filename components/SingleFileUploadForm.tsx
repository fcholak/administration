import React, { useState } from "react";
import { Form, Card, Button, Upload, message } from "antd";
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
    } catch (e) {
      console.error(e);
    }

    message.success(`Документот е успешно прикачен!`);
    onReset();
  };

  return (
    <Card style={{ width: 400, margin: "0 auto" }}>
      <Form form={form} onSubmitCapture={handleSubmit}>
        <FormItem label="Прикачи документ во .rtf или .docx формат">
          <Upload
            name="file"
            accept=".rtf,.docx"
            maxCount={1}
            multiple={false}
            onChange={handleFileChange}
            showUploadList={false}
            beforeUpload={(file) => {
              if (file.type !== "text/rtf") {
                message.error(
                  `Документот МОРА да биде во .rtf или .docx формат!`
                );
                return false;
              }
            }}
          >
            <Button>
              <UploadOutlined /> Избери документ
            </Button>
          </Upload>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={!file}>
            Прикачи
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default SingleFileUploadForm;
