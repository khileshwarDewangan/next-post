import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export async function getStaticProps() {
  const respose = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!respose.ok) {
    throw new Error("somthing was wrong on respost");
  }
  const data = await respose.json();

  return {
    props: {
      user: data,
    },
  };
}

export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        {user.map((data) => (
          <Link key={data.id} href={`post/${data.id}`} className={styles.box}>
            <p>{data.name}</p>
            <p>{data.username}</p>
            <p>{data.email}</p>
          </Link>
        ))}
      </main>
    </div>
  );
}
