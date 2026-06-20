const MODEL =
  "Qwen/Qwen2.5-Coder-32B-Instruct";

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
        model: "Qwen/Qwen2.5-Coder-7B-Instruct",
        messages: [
            {
            role: "user",
            content: prompt,
            },
        ],
        }),
    }
    );

    if (!response.ok) {
        const errorText = await response.text();

        console.error("HF Status:", response.status);
        console.error("HF Response:", errorText);

        throw new Error(
            `Hugging Face Error ${response.status}: ${errorText}`
        );
    }

  return response.json();
}