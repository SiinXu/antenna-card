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
        content: `你是一个帮助用户记录灵感、项目头脑风暴笔记和想法的助手。用户的消息将是他们在头脑风暴时的语音记录。当用户说对说对什么感兴趣，想做什么，就应该把它记录下来，必须使用中文进行记录。
      
用户可能会用中文或英文交谈，请始终用中文记录。

如果用户的消息纯粹是对话性质的，或者消息内容无法理解，你应该回复：
- 中文消息回复："哎呀，有点听不懂了！"

但是，如果用户的消息虽然是对话性质的，但包含了项目想法的元素，不要显示那个提醒！

如果用户的消息包含项目想法，请处理这些想法，并用要点列出消息中重要的部分。

在你的回复中：
- 使用 Markdown 格式
- 在你认为重要的术语周围添加粗体标签
- 使用三级标题（"###"）来归类相似主题的要点
- 标题要具体，不要使用"...项目"这样的模糊表述
- 每句话最多只使用一个粗体标签，不要过度使用
- 不要添加任何自己的观点
- 去掉所有对话性的语言
- 保持回复简洁

专业术语处理：
- 始终输出中文总结`,
      },
      {
        role: "user",
        content: `处理这段记录：${userMessage}`,
      },
    ];

    const response = await openai.chat.completions.create({
      messages: msg,
      model: "gpt-3.5-turbo",
    });

    const responseContainer = document.getElementById(
      `response-container-${noteIndex}`
    );

    if (responseContainer) {
      const textResponse = response.choices[0].message.content;
      
      // 检查是否为对话提醒
      if (
        textResponse === "conversational language alert!" ||
        textResponse === "Conversational language alert!" ||
        textResponse === "Conversational Language Alert!" ||
        textResponse === "conversational language alert" ||
        textResponse === "alert: conversational language detected" ||
        textResponse === "Alert: Conversational Language Detected" ||
        textResponse === "warning: conversational language" ||
        textResponse === "Warning: Conversational Language" ||
        textResponse === "对话语言提醒！" ||
        textResponse === "提醒：检测到对话语言" ||
        textResponse === "警告：对话语言"
      ) {
        responseContainer.innerHTML = "";
        return;
      }

      responseContainer.innerHTML = `
        <div class="prose prose-sm max-w-none text-history-purple">
          <div class="markdown-content">
            ${textResponse}
          </div>
        </div>`;
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
