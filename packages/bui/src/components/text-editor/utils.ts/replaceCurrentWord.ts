import { Transaction } from 'prosemirror-state';

export const replaceCurrentWord = (editor: any, replacement: string) => {
  const { state } = editor;
  const { from, empty } = state.selection;
  if (!empty) return; // Only works when there's a cursor, not a selection

  const text = state.doc.textBetween(0, state.doc.content.size, "\n", "\n");
  const cursor = from;

  // Find start of the current word
  let start = cursor - 1;
  while (start >= 0 && /\w/.test(text[start])) {
    start--;
  }

  // Find end of the current word
  let end = cursor;
  while (end < text.length && /\w/.test(text[end])) {
    end++;
  }

  const wordStart = start + 1;
  const wordEnd = end;

  editor
    .chain()
    .focus()
    .command(({ tr }:{ tr:Transaction }) => {
      tr.insertText(replacement, wordStart, wordEnd);
      return true;
    })
    .run();
}