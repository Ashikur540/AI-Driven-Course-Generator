"use client";

import { ObjectId } from "mongoose";
import React from "react";
import YouTube from "react-youtube";
import Markdown from "markdown-to-jsx";
import { useChapterQuery } from "@/hooks/query/useChaptersQuery";

export default function ChapterDetailsPage({
  params,
}: {
  params: { chapterId: ObjectId };
}) {
  const { data: chapterData, isLoading } = useChapterQuery(
    String(params?.chapterId)
  );
  const { title, description, ytVideoId, content } = chapterData ?? {};

  // const test = `# Here's a Heading`;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-black/80 mb-2">{title}</h1>
      <p className="text-gray-600 mb-4 test-sm">{description}</p>

      <div className="max-w-screen-lg">
        <YouTube
          videoId={ytVideoId}
          id={String(params?.chapterId)}
          className={`w-full`}
          iframeClassName={`w-full min-h-[600px]`}
          // style={object}
          title={chapterData?.title}
          loading={isLoading}
          // opts={obj}
          // onReady={func} /
          // onPlay={func}
          // onPause={func} /
          // onEnd={func}
          // onError={func}
          // onStateChange={func} // defaults -> noop
          // onPlaybackRateChange={func} // defaults -> noop
          // onPlaybackQualityChange={func} // defaults -> noop
        />
      </div>
      <article className="prose prose-slate mt-10">
        <Markdown>{content}</Markdown>
      </article>
    </div>
  );
}
