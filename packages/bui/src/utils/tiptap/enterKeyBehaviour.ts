import { Extension } from "@tiptap/core";
import HardBreak from "@tiptap/extension-hard-break";

export const enterKeyBehaviour = Extension.create<{
  onEnter?: (content: string) => void;
}>({
      name: "enterKeyBehaviour",
      addOptions() {
        return {
          onEnter: undefined,
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
            if(this.storage.isInList) return false;

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
            this.storage.hasUsedNewline = true;
            return this.editor.commands.setHardBreak();
          },
          "Mod-Enter": () => {
            this.options.onEnter?.(this.editor.getMarkdown());
            this.storage.hasUsedNewline = false;
            return true;
          }
        };
      },
      onUpdate({ editor }) {
        if (this.storage.hasUsedNewLine) return;

        // Check if cursor is inside a list
        this.storage.isInList =
          editor.isActive('bulletList') ||
          editor.isActive('orderedList') ||
          editor.isActive('listItem');

        if (this.storage.isInList) {
          (this.editor.commands as any).setHasUsedNewline(true);
        }
      },
    });
