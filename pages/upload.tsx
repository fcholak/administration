import { Row, Col } from "antd";

import SingleFileUploadForm from "../components/SingleFileUploadForm";
export default function UploadForm() {
  return (
    <Row
      style={{ height: "80vh", overflow: "hidden" }}
      justify="center"
      align="middle"
    >
      <Col flex="auto" span={12}>
        <SingleFileUploadForm />
      </Col>
    </Row>
  );
}
