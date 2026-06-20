export function buildReviewPrompt(
  code: string,
  language: string
) {
  return `
You are a senior software engineer and code reviewer.

Analyze the following ${language} code.

Focus on:

1. Bugs
2. Security vulnerabilities
3. Performance issues
4. Maintainability
5. Refactoring opportunities

Return ONLY valid JSON.

Schema:

{
  "score": number,
  "summary": string,
  "bugs": string[],
  "security": string[],
  "performance": string[],
  "refactoring": string[]
}

Code:

${code}
`;
}