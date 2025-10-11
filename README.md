# Personal Portfolio Website

A modern portfolio website built with Vue 3, TypeScript, and Vite featuring automatic project loading from markdown files.

## Features

- 🎨 Clean, centered navigation bar with rounded ends
- 📝 Automatic project loading from markdown files
- 🖼️ Project thumbnails and expandable descriptions
- 📄 Full project detail pages with markdown rendering
- 📱 Responsive design
- 🌓 Dark mode support (via CSS variables)

## Project Structure

```
src/
├── components/
│   └── NavigationBar.vue      # Top navigation component
├── views/
│   ├── HomeView.vue           # Landing page
│   ├── ProjectsView.vue       # Projects listing
│   ├── ProjectDetailView.vue  # Individual project page
│   └── ResumeView.vue         # Resume page
├── projects/                   # Add your markdown files here!
│   ├── lyra.md
│   └── example.md
├── utils/
│   └── projects.ts            # Project loading utilities
└── router/
    └── index.ts               # Route definitions
```

## Adding New Projects

1. Create a new `.md` file in `src/projects/`
2. Add frontmatter at the top:

```markdown
---
title: Your Project Title
description: A brief description that appears on the projects page
thumbnail: /assets/images/your-image.jpg
date: 2024-01-15
tags: [tag1, tag2, tag3]
---

# Your Project Title

Your full project content goes here in markdown format.

## Sections

You can use all standard markdown features:
- Lists
- **Bold** and *italic*
- Code blocks
- Images
- Links
- And more!
```

3. The project will automatically appear on the Projects page!

## Frontmatter Fields

- `title` (required): Project title
- `description` (required): Short description shown on projects listing
- `thumbnail` (optional): Path to thumbnail image (place images in `public/assets/images/`)
- `date` (optional): Project date
- `tags` (optional): Array of tags

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Customization

### Styling
- Edit CSS variables in `src/assets/base.css` and `src/assets/main.css`
- Modify component styles in individual `.vue` files

### Navigation
- Edit `src/components/NavigationBar.vue` to change navigation items
- Update routes in `src/router/index.ts`

### Home Page
- Customize content in `src/views/HomeView.vue`

### Resume Page
- Add your resume content in `src/views/ResumeView.vue`
- You can embed a PDF viewer or create a custom resume layout

## Technologies Used

- Vue 3 (Composition API with `<script setup>`)
- TypeScript
- Vue Router
- Vite
- Marked (Markdown parser)
