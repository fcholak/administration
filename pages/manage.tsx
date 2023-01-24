import { BlobServiceClient } from "@azure/storage-blob";
import { useEffect, useState } from "react";
import { getBlobsInContainer } from "../lib/storage";
import { Table, message } from "antd";
import type { BlobData } from "../lib/storage";
import { GrDocumentRtf } from "react-icons/gr";
import { TiDocumentDelete } from "react-icons/ti";

export default function ManageDocuments() {
  const [blobs, setBlobs] = useState<BlobData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const containerName = "container01";
  const storageAccountName = process.env.NEXT_PUBLIC_ACC_NAME;
  const sasToken = process.env.NEXT_PUBLIC_SAS;
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  async function onDelete(record: any) {
    const containerClient = blobService.getContainerClient(containerName);
    const fileRef = containerClient.getBlobClient(record.blobName);

    const response = await fileRef.delete();

    if (response.errorCode === undefined) {
      message.success("Успешно го избришавте документот!");
      setBlobs(blobs.filter((x) => x.blobName !== record.blobName));
    }
  }

  const fetchBlobs = async (): Promise<void> => {
    setLoading(true);
    try {
      const containerClient = blobService.getContainerClient(containerName);
      const blobs = await getBlobsInContainer(containerClient);
      setBlobs(blobs);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlobs();
  }, []);

  const columns = [
    {
      title: "Документи",
      dataIndex: "blobName",
      key: "1",
    },
    {
      title: "Линк",
      dataIndex: "url",
      key: "2",
      render: (text: string, record: any) => (
        <a href="#" onClick={() => window.open(record.url)}>
          <GrDocumentRtf fontSize={25} />
        </a>
      ),
    },
    {
      title: "Датум на прикачување",
      dataIndex: "createdOn",
      key: "3",
      render: (record: any) => <span>{JSON.stringify(record.createdOn)}</span>,
    },
    {
      title: "Акции",
      key: "4",
      render: (record: any) => {
        return (
          <TiDocumentDelete fontSize={35} onClick={() => onDelete(record)} />
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={blobs}
      loading={loading}
      rowKey="name"
      pagination={{
        position: ["bottomCenter"],
        simple: false,
        size: "small",
      }}
    />
  );
}
