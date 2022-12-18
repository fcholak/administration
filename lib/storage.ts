import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const sasToken = process.env.NEXT_PUBLIC_SAS;
const containerName = "container01";
const storageAccountName = process.env.NEXT_PUBLIC_ACC_NAME;

export interface BlobData {
  blobName: string;
  url: string;
  createdOn: Date;
}

export const isStorageConfigured = () => {
  return !(!storageAccountName || !sasToken);
};

export const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const blobData = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    const { properties, name } = blob;
    const constructedUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`;
    blobData.push({
      blobName: name,
      url: constructedUrl,
      createdOn: properties.createdOn,
    } as BlobData);
  }

  return blobData;
};

const createBlobInContainer = async (
  containerClient: ContainerClient,
  file: File
) => {
  const blobClient = containerClient.getBlockBlobClient(file.name);

  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  await blobClient.uploadBrowserData(file, options);
  await blobClient.setMetadata({ UserName: "filipcholakoski" });
};

const uploadFileToBlob = async (file: File | null) => {
  if (!file) return [];

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  const containerClient = blobService.getContainerClient(containerName);

  await createBlobInContainer(containerClient, file);

  return getBlobsInContainer(containerClient);
};

export default uploadFileToBlob;
