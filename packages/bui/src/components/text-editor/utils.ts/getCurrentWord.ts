export const getCurrentWord = (editor: any): string | null => {
  const { state } = editor;
  const { from, empty } = state.selection;

  if (!empty) return null; // Only works with a cursor, not a range selection

  const text = state.doc.textBetween(0, state.doc.content.size, "\n", "\n");

  // Cursor position in the full text
  const cursorPos = from;

  // Find word start
  let start = cursorPos - 1;
  while (start >= 0 && /\w/.test(text[start])) {
    start--;
  }

  // Find word end
  let end = cursorPos;
  while (end < text.length && /\w/.test(text[end])) {
    end++;
  }

  const word = text.slice(start + 1, end);
  return word || null;
}