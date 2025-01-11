class VolcanoEngine {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://open.volcengineapi.com/v2/llm/chat";
  }

  async chat() {
    return {
      completions: {
        create: async ({ messages, model = "doubao-pro-128k", stream = false, temperature = 0.7, max_tokens = 2048 }) => {
          const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.apiKey
            },
            body: JSON.stringify({
              model,
              messages,
              stream,
              temperature,
              max_tokens
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          if (stream) {
            return this._handleStream(response);
          } else {
            const data = await response.json();
            return {
              choices: [{
                message: {
                  content: data.data.choices[0].message.content
                }
              }]
            };
          }
        }
      }
    };
  }

  async *_handleStream(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() === "") continue;
        if (line.startsWith("data: ")) {
          const jsonData = JSON.parse(line.slice(6));
          yield {
            choices: [{
              delta: {
                content: jsonData.data.choices[0].delta.content || ""
              }
            }]
          };
        }
      }
    }
  }
}

export default function createVolcanoEngine(config) {
  return new VolcanoEngine(config.apiKey);
}
