"use client";

import { paramCase } from "@/utils/paramCase";
import { Blog, PostResponse } from "@/utils/types";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";

export default function PostDetails() {
  const [post, setPost] = useState<PostResponse>();
  const params = useParams<{ title: string }>();
  const title = params.title;

  useLayoutEffect(() => {
    fetch(
      `https://api-dev-minimal-v510.vercel.app/api/post/details?title=${title}`
    ).then((response) => response.json().then(setPost));
  }, [title]);

  if (!post) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  const currentPost = post.post;
  const date = new Date(currentPost.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  console.log(currentPost);
  return (
    <div className="flex w-full flex-col items-center">
      <div
        style={{ backgroundImage: `url(${currentPost.coverUrl})` }}
        className="h-480 w-screen bg-cover bg-no-repeat bg-coverOpacity items-center flex flex-col"
      >
        <div className="max-w-6xl py-16 w-full flex flex-col justify-between h-full">
          <h2 className="text-3xl text-white w-480 font-bold leading-48">
            {currentPost.title}
          </h2>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <Avatar.Root>
                <Avatar.Image
                  src={currentPost.author.avatarUrl}
                  alt={currentPost.author.name}
                  className="rounded-full"
                  height={64}
                  width={64}
                />
              </Avatar.Root>
              <div className="flex flex-col gap-1 justify-center">
                <p className="text-white text-base font-semibold">{currentPost.author.name}</p>
                <p className="text-white text-sm font-normal">{formattedDate}</p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-600 flex justify-center items-center">
              <Image src="/icons/icon=share-white.svg" alt="share_icon" height={18} width={15}/>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row gap-4 items-center max-w-720 w-full my-6">
        <p className="text-sm font-normal">Home</p>
        <div className="h-1 w-1 rounded-full bg-slate-400"/>
        <p className="text-sm font-normal">Blog</p>
        <div className="h-1 w-1 rounded-full bg-slate-400"/>
        <p className="text-sm font-normal text-slate-400">{currentPost.title}</p>
      </div>

      <div className="border-t w-full bg-slate-400"/>
    </div>
  );
}
