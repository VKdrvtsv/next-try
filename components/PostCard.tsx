'use client'

import { Blog, Post } from "@/utils/types";
import Image from "next/image";
import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { paramCase } from "@/utils/paramCase";

interface Props {
  post: Blog;
}

export const PostCard: FC<Props> = ({ post }) => {
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const normalizedTitle = paramCase(post.title);

  return (
    <Link href="/[title]" as={`/${normalizedTitle}`}>
      <div className="w-270 rounded-2xl shadow-sm border border-slate-100">
        <Image
          src={post.coverUrl}
          alt={post.title}
          height={202}
          width={270}
          className="rounded-t-2xl"
        />

        <Avatar.Root>
          <Avatar.Image src={post.author.avatarUrl} alt={post.author.name} className="rounded-full border-4 border-white -translate-y-1/2 ml-5" height={48} width={48}/>
        </Avatar.Root>

        <div className="mx-6 flex flex-col gap-2 mb-6">
          <p className="text-xs font-normal text-slate-400">{formattedDate}</p>
          <p className="text-sm font-semibold text-slate-950">{post.title}</p>
        </div>

        <div className="flex flex-row gap-3 mx-6 justify-end mb-6">
          <div className="flex flex-row gap-1">
            <Image 
            src="/icons/Icon=message.svg"
            alt="message"
            height={16}
            width={16}/>
            <p className="text-xs font-normal text-slate-400">{post.totalComments}</p>
          </div>
          <div className="flex flex-row gap-1">
            <Image 
            src="/icons/Icon=eye.svg"
            alt="message"
            height={16}
            width={16}/>
            <p className="text-xs font-normal text-slate-400">{post.totalViews}</p>
          </div>
          <div className="flex flex-row gap-1">
            <Image 
            src="/icons/Icon=share.svg"
            alt="message"
            height={16}
            width={16}/>
            <p className="text-xs font-normal text-slate-400">{post.totalShares}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
