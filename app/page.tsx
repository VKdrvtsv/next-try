"use client"

import { PostCard } from "@/components/PostCard";
import { BlogResponse } from "@/utils/types";
// import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useLayoutEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState<BlogResponse>();

  useLayoutEffect(() => {
    fetch(
      "https://api-dev-minimal-v510.vercel.app/api/post/list",
    ).then((response) => (response.json().then(setBlogs)));
  }, [])

  if (!blogs) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-9 max-w-6xl">
      <h1 className="font-bold text-2xl">Blog</h1>

      <div className="flex flex-row flex-wrap gap-6">
        {blogs.posts.map(post => {
          return <PostCard key={post.id} post={post}/>
        })}
      </div>
    </div>
  );
}

// async function GetStaticProps() {
//   const res = await fetch('https://api-dev-minimal-v510.vercel.app/api/post/list')
//   const blogs = await res.json()
//   return { props: { blogs } }
// }
