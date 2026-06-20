const MODEL = "Qwen/Qwen2.5-Coder-7B-Instruct";

export async function queryModel(
  prompt: string
) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 800,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "HF Error:",
      JSON.stringify(data, null, 2)
    );

    throw new Error(
      `Hugging Face Error ${response.status}`
    );
  }

  return data;
}