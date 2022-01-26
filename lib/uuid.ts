export function generateUid(prefix) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}
