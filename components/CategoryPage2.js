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

const NoteCard = ({ content, analysis, actionPlan, index }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [copied, setCopied] = useState(false);

  const pages = [
    { title: "核心想法", content },
    { title: "创意分析", content: analysis },
    { title: "行动计划", content: actionPlan }
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pages[currentPage].content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClose = () => {
    const container = document.getElementById(`response-container-${index}`);
    if (container) {
      container.style.display = 'none';
    }
  };

  return (
    <div className="relative group">
      <Card className="h-fit w-48 m-4 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 border border-white/20 rounded-xl overflow-hidden">
        <CardContent className="p-4 text-white">
          <div className="absolute top-2 right-2 flex space-x-2">
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

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{pages[currentPage].title}</h3>
            <div className="prose prose-sm max-w-none text-white">
              <div className="markdown-content">
                <Markdown>{pages[currentPage].content}</Markdown>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
              disabled={currentPage === 0}
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                />
              </svg>
            </button>
            <span className="text-sm text-white/80">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
              disabled={currentPage === pages.length - 1}
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                />
              </svg>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CategoryPage2 = ({ title, initialNotes = [] }) => {
  console.log("notes: ", initialNotes);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    initialNotes.forEach((note, index) => {
      processNote(note, index);
    });
  }, [initialNotes]);

  const processNote = async (userMessage, noteIndex) => {
    try {
      const [noteContent, analysis, actionPlan] = await Promise.all([
        takeNotes(userMessage),
        analyzeIdea(userMessage),
        createActionPlan(userMessage)
      ]);

      if (!noteContent) return;

      const container = document.getElementById(`response-container-${noteIndex}`);
      if (container) {
        const root = container.parentElement;
        if (root) {
          root.innerHTML = '';
          root.appendChild(
            React.createElement(NoteCard, { 
              content: noteContent, 
              analysis: analysis, 
              actionPlan: actionPlan, 
              index: noteIndex 
            })
          );
        }
      }
    } catch (error) {
      console.error("Error processing note:", error);
    }
  };

  return (
    <>
      <div className="m-4 px-6 py-4 border border-white h-20">
        <p className="text-white text-5xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-screen">
        <MyWrapper>
          {initialNotes.map((note, key) => (
            <div key={key} id={`response-container-${key}`}>
              <NoteCard content={note} index={key} />
            </div>
          ))}
        </MyWrapper>
      </div>
    </>
  );
};

export default CategoryPage2;
