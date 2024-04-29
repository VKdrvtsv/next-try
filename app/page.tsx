import { PostCard } from "@/components/PostCard";
import { BlogResponse } from "@/utils/types";
import { notFound } from "next/navigation";
import Loader from "./loading";

async function getData() {
  const res = await fetch('https://api-dev-minimal-v510.vercel.app/api/post/list')
 
  return res.json()
}

export default async function Home() {
  const blogs: BlogResponse = await getData();

  if(!blogs) {
    return <Loader />
  }

  return (
    <div className="flex w-full flex-col gap-9 max-w-1200 px-6">
      <h1 className="font-bold text-2xl">Blog</h1>

      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {blogs.posts.map(post => {
          return <PostCard key={post.id} post={post}/>
        })}
      </div>
    </div>
  );
}
