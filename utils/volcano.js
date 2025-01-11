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
              "Authorization": `Bearer ${this.apiKey}`,
              "X-API-Key": this.apiKey
            },
            body: JSON.stringify({
              model,
              messages,
              stream,
              temperature,
              max_tokens,
              top_p: 0.7,
              frequency_penalty: 0,
              presence_penalty: 0
            })
          });

          if (!response.ok) {
            const errorData = await response.text();
            console.error("Volcano API Error:", errorData);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
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

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "") continue;
          if (line.startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.slice(6));
              yield {
                choices: [{
                  delta: {
                    content: jsonData.data.choices[0].delta.content || ""
                  }
                }]
              };
            } catch (error) {
              console.error("Error parsing stream data:", error, line);
            }
          }
        }
      }
    } catch (error) {
      console.error("Stream reading error:", error);
      throw error;
    }
  }
}

export default function createVolcanoEngine(config) {
  if (!config.apiKey) {
    throw new Error("Volcano API key is required");
  }
  return new VolcanoEngine(config.apiKey);
}
