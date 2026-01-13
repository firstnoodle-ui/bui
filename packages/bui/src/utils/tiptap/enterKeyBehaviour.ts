import { Extension } from "@tiptap/core";

export const enterKeyBehaviour = Extension.create<{
  onEnter?: (content: string) => void;
  modEnterOnly?: boolean;
}>({
  name: "enterKeyBehaviour",
  priority: 1000,
  addOptions() {
    return {
      onEnter: undefined,
      modEnterOnly: false,
    };
  },
  addStorage() {
    return {
      hasUsedNewline: false,
      isInList: false,
    };
  },
  addCommands() {
    return {
      setHasUsedNewline: (value: boolean) =>
        () => {
          this.storage.hasUsedNewline = value;
          return true;
        },
    } as any;
  },
  addKeyboardShortcuts() {
    return {
      "Enter": () => {
        // If modEnterOnly is true, use default Enter behavior
        if (this.options.modEnterOnly) {
          return false;
        }

        if (this.storage.isInList) return false;

        if (this.storage.hasUsedNewline) {
          return this.editor.commands.createParagraphNear();
        }
        else {
          this.options.onEnter?.(this.editor.getMarkdown());
          this.storage.hasUsedNewline = false;
          return true;
        }
      },
      "Shift-Enter": () => {
        // If modEnterOnly is true, use default Shift-Enter behavior
        if (this.options.modEnterOnly) {
          return false;
        }

        // this.storage.hasUsedNewline = true;
        (this.editor.commands as any).setHasUsedNewline(true);
        // if (this.editor.isActive('heading')) {
        //   return this.editor.commands.splitBlock();
        // }
        // return false;

        const editor = this.editor;

        // 1️⃣ Heading → exit heading
        if (editor.isActive("heading")) {
          return editor.commands.splitBlock();
        }

        // 2️⃣ List → let ProseMirror handle it
        if (
          editor.isActive("bulletList")
          || editor.isActive("orderedList")
          || editor.isActive("listItem")
        ) {
          return false;
        }

        // 3️⃣ Code block → newline
        if (editor.isActive("codeBlock")) {
          return editor.commands.insertContent("\n");
        }

        // 4️⃣ Paragraph → hard break
        if (editor.isActive("paragraph")) {
          return editor.commands.splitBlock();
          // return editor.commands.setHardBreak();
        }

        // 5️⃣ Fallback → default
        return false;
      },
      "Mod-Enter": () => {
        this.options.onEnter?.(this.editor.getMarkdown());
        this.storage.hasUsedNewline = false;
        return true;
      },
    };
  },
  onUpdate({ editor }) {
    // Skip storage updates if modEnterOnly is true
    if (this.options.modEnterOnly) return;

    if (this.storage.hasUsedNewline) return;

    // Check if cursor is inside a list
    this.storage.isInList
          = editor.isActive("bulletList")
            || editor.isActive("orderedList")
            || editor.isActive("listItem");

    if (this.storage.isInList) {
      (this.editor.commands as any).setHasUsedNewline(true);
    }
  },
});
