export function getValidImageURL(
  input?: File | string | null
): string | undefined {
  if (!input) return undefined; // return undefined instead of null

  if (input instanceof File) {
    return URL.createObjectURL(input);
  }

  if (typeof input === "string") {
    try {
      const url = new URL(input);
      return url.href;
    } catch {
      console.warn(`Invalid URL string passed to getValidImageURL: ${input}`);
      return undefined; // undefined instead of null
    }
  }

  return undefined;
}
