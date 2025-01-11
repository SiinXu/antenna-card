import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function takeNotes(userMessage) {
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
      that you deem important. Also use Markdown and use a header level 3 ("###") with the similar theme of the bullet points. Be very specific and don't use "... Project". Do not be excessive about these bold tags; only use at
      most one of them per sentence. In your response, do not add any parts of your own. Leave out any conversational
      language and be concise in your response. `,
    },
    {
      role: "user",
      content: `Process this transcript: ${userMessage}`,
    },
  ];

  // const response = await openai.chat.completions.create({
  //   messages: msg,
  //   model: "gpt-4o",
  //   stream: true,
  // });

  const response = await openai.chat.completions.create({
    messages: msg,
    // model: "gpt-4o",
    model: "gpt-3.5-turbo",
  });

  const textResponse = response.choices[0].message.content;
  console.log(textResponse);

  // ignores textResponse if the user message was conversational
  if (
    textResponse === "conversational language alert!" ||
    textResponse === "Conversational language alert!" ||
    textResponse === "Conversational Language Alert!" ||
    textResponse === "conversational language alert" ||
    textResponse === "alert: conversational language detected" ||
    textResponse === "Alert: Conversational Language Detected" ||
    textResponse === "warning: conversational language" ||
    textResponse === "Warning: Conversational Language"
  ) {
    return "";
  }
  return textResponse;
}

export async function summarizeContent(notes) {
  const notesContent = notes.join(". ");
  const msg = [
    {
      role: "system",
      content:
        "You will help the user create a summary of the notes that they input",
    },
    {
      role: "user",
      content: `Summarize the following notes: ${notesContent}`,
    },
  ];

  const summarizeResponse = await openai.chat.completions.create({
    messages: msg,
    // model: "gpt-3.5-turbo",
    model: "gpt-4o",
  });

  const textResponse = summarizeResponse.choices[0].message.content;
  return textResponse;
}
