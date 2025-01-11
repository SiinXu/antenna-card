import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Markdown from "react-markdown";
import createVolcanoEngine from "@/utils/volcano";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 7 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const CategoryPage2 = ({ title, initialNotes = [] }) => {
  console.log("notes: ", initialNotes);

  const volcano = createVolcanoEngine({
    apiKey: process.env.NEXT_PUBLIC_VOLCANO_API_KEY,
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
        content: `你是一个帮助用户记录灵感、项目头脑风暴笔记和想法的助手。用户的消息将是他们在头脑风暴时的语音记录。当用户说对说对什么感兴趣，想做什么，就应该把它记录下来。
        

如果用户的消息纯粹是对话性质的，或者消息内容无法理解，你应该回复"对话语言提醒！"。

但是，如果用户的消息虽然是对话性质的，但包含了项目想法的元素，不要显示那个提醒！

如果用户的消息包含项目想法，请处理这些想法，并用要点列出消息中重要的部分。

在你的回复中：
- 使用 Markdown 格式
- 在你认为重要的术语周围添加粗体标签
- 每句话最多只使用一个粗体标签，不要过度使用
- 不要添加任何自己的观点
- 去掉所有对话性的语言
- 保持回复简洁`,
      },
      {
        role: "user",
        content: `处理这段记录：${userMessage}`,
      },
    ];

    try {
      const response = await volcano.chat().completions.create({
        messages: msg,
        model: "doubao-pro-128k",
        stream: true,
      });

      const responseContainer = document.getElementById(
        `response-container-${noteIndex}`
      );

      if (responseContainer) {
        responseContainer.innerHTML = "";
        let fullResponse = "";

        for await (const chunk of response) {
          const content = chunk.choices[0].delta.content || "";
          fullResponse += content;
          // 使用 Markdown 组件渲染内容
          responseContainer.innerHTML = `
            <div class="prose prose-sm max-w-none text-history-purple">
              <div class="markdown-content">
                ${fullResponse}
              </div>
            </div>`;
        }
      }
    } catch (error) {
      console.error("Error processing notes:", error);
    }
  };

  return (
    <>
      <div className="m-4 px-6 py-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
        <p className="text-current-purple text-4xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-screen">
        <MyWrapper>
          {initialNotes.map((note, key) => (
            <Card
              key={key}
              className="h-fit w-48 m-4 bg-glass-gradient backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/20 rounded-xl"
            >
              <CardContent className="p-4">
                <div
                  id={`response-container-${key}`}
                  className="prose prose-sm max-w-none text-history-purple"
                />
              </CardContent>
            </Card>
          ))}
        </MyWrapper>
      </div>
    </>
  );
};

export default CategoryPage2;
