import { BlobServiceClient } from "@azure/storage-blob";
import { useEffect, useState } from "react";
import { getBlobsInContainer } from "../lib/storage";
import { Table } from "antd";
import type { BlobData } from "../lib/storage";

export default function ManageDocuments() {
  const [blobs, setBlobs] = useState<BlobData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const containerName = "container01";
  const storageAccountName = process.env.NEXT_PUBLIC_ACC_NAME;
  const sasToken = process.env.NEXT_PUBLIC_SAS;

  const fetchBlobs = async (): Promise<void> => {
    setLoading(true);
    try {
      const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      );
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
      title: "Name",
      dataIndex: "blobName",
      key: "blobName",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text: string, record: any) => (
        <a href="#" onClick={() => window.open(record.url)}>
          DOWNLOAD
        </a>
      ),
    },
    {
      title: "createdOn",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text: string, record: any) => (
        <span>{JSON.stringify(record.createdOn)}</span>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={blobs}
      loading={loading}
      rowKey="name"
    />
  );
}
