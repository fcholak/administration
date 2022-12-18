import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home(): React.FC {
  return (
    <>
      <Head>
        <title>Administration</title>
        <meta
          name="description"
          content="Administration dashboard for internal use"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href="/upload">Upload</Link>
      </div>
    </>
  );
}
