import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Markdown from "react-markdown";
import OpenAI from "openai";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 7 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
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
      takeNotes(note, index);
    });
  }, [initialNotes]);

  const takeNotes = async (userMessage, noteIndex) => {
    const msg = [
      {
        role: "system",
        content: `You are a bot that will help the user jot down notes and ideas for their 
            project brainstorm session. The user messages will be verbal transcripts of ideas 
            they are brainstorming. If the user message is purely conversational or the user 
            message is incomprehensible, you will respond with the message 'conversational language alert!'. 
            However, if the user message is conversational but includes elements of their project idea, 
            do not display that message! If the user message contains project ideas, process 
            the ideas and respond with bullet points for parts of the user message that are 
            important. In your response, use Markdown and add bold tags around certain terms 
            that you deem important. Do not be excessive about these bold tags; only use at 
            most one of them per sentence. In your response, do not add any parts of your own. Leave out any conversational 
            language and be concise in your response.`,
      },
      {
        role: "user",
        content: `Process this transcript: ${userMessage}`,
      },
    ];

    const response = await openai.chat.completions.create({
      messages: msg,
      model: "gpt-4o",
      stream: true,
    });

    const responseContainer = document.getElementById(
      `response-container-${noteIndex}`
    );
    responseContainer.innerHTML = "";

    for await (const chunk of response) {
      const content = chunk.choices[0].delta.content || "";
      responseContainer.innerHTML += content;
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
              <Card className="h-fit w-48 m-4 bg-slate-50 hover:bg-slate-400 focus:ring focus:ring-yellow-500 flex justify-center rounded-md">
                <CardContent>
                  <p className="text-base p-2">
                    <div id={`response-container-${key}`} />
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </MyWrapper>
      </div>
    </>
  );
};

export default CategoryPage2;
