import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const PasteImage = Extension.create({
  name: 'pasteImage',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pasteImage'),
        props: {
          handlePaste: (view, event) => {
            const items = Array.from(event.clipboardData?.items || [])
            const imageItem = items.find(item => item.type.startsWith('image/'))

            if (!imageItem) return false

            const file = imageItem.getAsFile()
            if (!file) return false

            const reader = new FileReader()
            reader.onload = () => {
              const src = reader.result as string
              const { tr } = view.state
              const imageNode = view.state.schema.nodes.image.create({ src })
              view.dispatch(tr.replaceSelectionWith(imageNode))
            }
            reader.readAsDataURL(file)

            return true
          },
        },
      }),
    ]
  },
})