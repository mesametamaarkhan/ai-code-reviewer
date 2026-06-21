export function detectLanguage(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "ts":
      return "typescript";

    case "tsx":
      return "typescript";

    case "js":
      return "javascript";

    case "jsx":
      return "javascript";

    case "py":
      return "python";

    case "java":
      return "java";

    case "go":
      return "go";

    case "rs":
      return "rust";

    case "cpp":
      return "cpp";

    case "c":
      return "c";

    default:
      return "plaintext";
  }
}
