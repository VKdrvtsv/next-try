"use client";

import { paramCase } from "@/utils/paramCase";
import { Blog, PostResponse } from "@/utils/types";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

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

  function formatNumber(number: number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 10000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return Math.floor(number / 1000) + "k";
    }
  }

  const favorites = formatNumber(currentPost.totalFavorites);
  const slicedPeople = currentPost.favoritePerson.slice(0, 3);

  return (
    <div className="flex w-full flex-col items-center pb-10">
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
                <p className="text-white text-base font-semibold">
                  {currentPost.author.name}
                </p>
                <p className="text-white text-sm font-normal">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-600 flex justify-center items-center">
              <Image
                src="/icons/icon=share-white.svg"
                alt="share_icon"
                height={18}
                width={15}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center max-w-720 w-full my-6">
        <p className="text-sm font-normal">Home</p>
        <div className="h-1 w-1 rounded-full bg-gray-400" />
        <p className="text-sm font-normal">Blog</p>
        <div className="h-1 w-1 rounded-full bg-gray-400" />
        <p className="text-sm font-normal text-gray-400">{currentPost.title}</p>
      </div>

      <div className="border-t w-full bg-gray-400 mb-10" />

      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
        className="flex flex-col max-w-720"
      > 
        {currentPost.description + currentPost.content}
      </ReactMarkdown>

      <div className="flex flex-col gap-6 max-w-720 w-full py-6 border-y border-grey-300 border-dashed border-dashed-lg">
        <div className="flex flex-row gap-2">
          {currentPost.tags.map((word) => {
            return (
              <div
                key={word}
                className="bg-gray-100 rounded-lg self-center py-1.5 px-3"
              >
                <p className="capitalize text-sm font-medium">{word}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/icons/icon=heart.svg"
            alt="likes"
            height={20}
            width={20}
          />
          <p className="text-sm font-normal">{favorites}</p>
          <div className="flex flex-row">
            {slicedPeople.map((person, index) => {
              const zIndex = index + 1 + "0";
              console.log(zIndex);
              return <div key={person.name} className={`-mr-2 -z-${zIndex}`} >
                <Avatar.Root>
                <Avatar.Image
                  src={person.avatarUrl}
                  alt={person.name}
                  className="rounded-full border-2 border-white"
                  height={44}
                  width={44}
                />
              </Avatar.Root>
              </div>
            })
            }
            <div className="flex rounded-full border-2 border-white w-11 h-11 justify-center items-center bg-green-200">
              <p className="text-xs font-semibold text-green-700">+{currentPost.favoritePerson.length - 3}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
