import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Markdown from "react-markdown";
import OpenAI from "openai";
import { analyzeIdea, createActionPlan, takeNotes } from "@/utils/openai";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const CategoryPage2 = ({ title, initialNotes = [] }) => {
  const [notes, setNotes] = useState([]);
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    Promise.all(
      initialNotes.map(async (note) => {
        try {
          const [content, analysis, actionPlan] = await Promise.all([
            takeNotes(note),
            analyzeIdea(note),
            createActionPlan(note),
          ]);
          return { content, analysis, actionPlan };
        } catch (error) {
          console.error("Error processing note:", error);
          return null;
        }
      })
    ).then((processedNotes) => {
      setNotes(processedNotes.filter(Boolean));
    });
  }, [initialNotes]);

  const handleRemoveNote = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const NoteCard = ({ note, index }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const pages = [
      { title: "核心想法", content: note.content },
      { title: "创意分析", content: note.analysis },
      { title: "行动计划", content: note.actionPlan }
    ];

    const handleCopy = async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(pages[currentPage].content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    const handleClose = (e) => {
      e.stopPropagation();
      handleRemoveNote(index);
    };

    return (
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className="h-fit w-64 m-4 bg-white/10 backdrop-blur-lg hover:bg-white/15 transition-all duration-300 border border-white/20 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
        >
          <CardContent className="p-4 text-white relative">
            {isHovered && (
              <div className="absolute top-2 right-2 flex space-x-2 z-10">
                <button
                  onClick={handleCopy}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="mt-2">
              <h3 className="text-lg font-semibold mb-2">{pages[currentPage].title}</h3>
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="markdown-content">
                  <Markdown>{pages[currentPage].content}</Markdown>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              <span className="text-sm text-white/80">
                点击卡片查看更多 {currentPage + 1}/{pages.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <div className="m-4 px-6 py-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-lg">
        <p className="text-white text-4xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-screen">
        <MyWrapper>
          {notes.map((note, index) => (
            <NoteCard key={index} note={note} index={index} />
          ))}
        </MyWrapper>
      </div>
    </>
  );
};

export default CategoryPage2;
