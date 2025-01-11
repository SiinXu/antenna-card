import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function takeNotes(userMessage) {
  const msg = [
    {
      role: "system",
      content: `你是一个帮助用户记录灵感、项目头脑风暴笔记和想法的助手。用户的消息将是他们在头脑风暴时的语音记录。当用户说对说对什么感兴趣，想做什么，就应该把它记录下来，必须使用中文进行记录。
      
用户可能会用中文或英文交谈，请始终用中文记录。

如果用户的消息纯粹是对话性质的，或者消息内容无法理解，你应该回复：
- 中文消息回复："哎呀，有点听不懂了！"

但是，如果用户的消息虽然是对话性质的，但包含了项目想法的元素，不要显示那个提醒！

请按照以下三个方面分析用户的想法：

1. 核心想法记录：
- 使用 Markdown 格式
- 在重要的术语周围添加粗体标签
- 使用三级标题（"###"）来归类相似主题的要点
- 标题要具体，不要使用"...项目"这样的模糊表述
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

  const response = await openai.chat.completions.create({
    messages: msg,
    model: "gpt-4o",
  });

  const textResponse = response.choices[0].message.content;
  console.log(textResponse);

  if (textResponse === "哎呀，有点听不懂了！") {
    return "";
  }
  return textResponse;
}

export async function summarizeContent(notes) {
  const notesContent = notes.join(". ");
  const msg = [
    {
      role: "system",
      content: `你将帮助用户总结他们的项目笔记。请遵循以下规则：

1. 语言选择：
- 用中文总结


2. 总结要求：
- 保持简洁明了
- 突出关键想法和主题
- 保留重要的技术术语
- 使用项目相关的专业用语

3. 格式要求：
- 使用 Markdown 格式
- 重要概念用粗体标注
- 使用清晰的层级结构
- 适当使用要点列表

4. 专业术语：
- 中文总结中的技术术语可以附带英文原文
- 英文总结保持专业术语不变`,
    },
    {
      role: "user",
      content: `总结以下笔记内容：${notesContent}`,
    },
  ];

  const summarizeResponse = await openai.chat.completions.create({
    messages: msg,
    model: "gpt-4o",
  });

  const textResponse = summarizeResponse.choices[0].message.content;
  return textResponse;
}

export async function analyzeIdea(userMessage) {
  const msg = [
    {
      role: "system",
      content: `你是一个帮助用户分析创意想法的助手。请对用户的想法进行深入分析，必须使用中文输出，保持回复简洁，100字以内。

分析维度包括：
1. 创新性分析
- 指出想法的创新点
- 与现有解决方案的区别
- 潜在的独特价值

2. 挑战与建议
- 可能遇到的主要挑战
- 关键成功因素
- 改进建议`,
    },
    {
      role: "user",
      content: `分析这个想法：${userMessage}`,
    },
  ];

  const response = await openai.chat.completions.create({
    messages: msg,
    model: "gpt-4o",
  });

  return response.choices[0].message.content;
}

export async function createActionPlan(userMessage) {
  const msg = [
    {
      role: "system",
      content: `你是一个帮助用户制定行动计划的助手。请根据用户的想法制定具体的行动计划，必须使用中文输出，，保持回复简洁，100字以内。

请按以下结构拆解行动计划：

1. 近期行动（1-2周内）
- 列出具体任务，标注优先级（高/中/低）
- 预估每个任务所需时间
- 建议的完成时间节点`,
    },
    {
      role: "user",
      content: `为这个想法制定行动计划：${userMessage}`,
    },
  ];

  const response = await openai.chat.completions.create({
    messages: msg,
    model: "gpt-4o",
  });

  return response.choices[0].message.content;
}
