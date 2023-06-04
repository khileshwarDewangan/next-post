import React from "react";
import style from "../../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

const getData = async function (url) {
  const respose = await fetch(url);
  if (!respose.ok) {
    throw new Error("somthing was wrong on respost");
  }

  return await respose.json();
};

function Post({ user }) {
  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <div className={style.container}>
        <p>{user.name}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <Link href="/">Back to home</Link>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const product = await getData("https://jsonplaceholder.typicode.com/users");

  const paths = product.map((data) => ({
    params: { id: data.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getData(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );

  return {
    props: {
      user: data,
    },
  };
}
export default Post;
