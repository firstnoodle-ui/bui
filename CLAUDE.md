# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Setup
```bash
# Setup all packages (run in order)
pnpm run setup-1-root
pnpm run setup-2-docs  
pnpm run setup-3-bui
```

### Development
```bash
# Start library build in watch mode + documentation site concurrently
# Use VS Code task: "Start Lib + Docs" or run separately:
pnpm run start-lib    # Build library in watch mode
pnpm run start-docs   # Start documentation site

# Individual package commands
cd packages/bui && pnpm vite build --watch  # Watch library builds
cd documentation/examples && pnpm vite      # Development documentation site
```

### Build and Quality
```bash
pnpm run build-lib   # Build the component library
pnpm run lint        # Run ESLint
pnpm run lint:fix    # Fix linting issues
pnpm run typecheck   # Type check all packages
```

### Release Process
```bash
pnpm run release     # Full release: lint, typecheck, changelog, bump version, publish
```

## Architecture

### Monorepo Structure
- **packages/bui/**: Main Vue 3 component library with TailwindCSS v4
- **packages/icon-font/**: Icon font package
- **documentation/examples/**: Documentation and playground site
- Built using pnpm workspace with linked packages

### Component Library (packages/bui/)
- **Components**: 40+ Vue components organized in `src/components/[component-name]/`
- **Composables**: Reusable Vue composition functions in `src/composables/`
- **Utils**: TypeScript utilities in `src/utils/`
- **Styling**: Uses Tailwind CSS v4 with theme system (`data-theme="light|dark"`)

### Build System
- **Vite** for build tooling with Vue plugin
- **vue-tsc** for TypeScript declaration generation
- **ESM-only** output format (`.mjs` files)
- **CSS bundling** includes TailwindCSS styles in `dist/bui.css`

### Component Structure
Each component follows this pattern:
```
src/components/[component-name]/
├── index.ts          # Export definitions
├── Component.vue     # Main component file
└── types.ts          # TypeScript types (if needed)
```

### Publishing
- Published to npm registry as `@firstnoodle-ui/bui`
- Requires authentication for publishing
- Uses semver with automated changelog generation

### Theming
The library requires consumers to:
1. Set `data-theme="light"` or `data-theme="dark"` on `<html>` tag
2. Import CSS: `import "@firstnoodle-ui/bui/dist/bui.css"`
3. Include TailwindCSS in their project

### Dependencies
Key dependencies include:
- **Vue 3** (peer dependency)
- **TailwindCSS v4** (peer dependency) 
- **@floating-ui/dom** for positioning
- **Tiptap editor** extensions for rich text components
- **debounce** for performance optimization