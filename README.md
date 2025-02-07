# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## How this project was set up

- npm init vite recipe-app
- following the [TailwindCSS installation instructions](https://tailwindcss.com/docs/installation/using-vite) and adding the `@import "tailwindcss";` to `src/style.css`

## SEO

Since this is purely a hobby project, there's no point in having it indexed by search engines.

Therefor they are discouraged from crawling and indexing it by

- the `robots.txt `file
- the `<meta name="robots" content="noindex, nofollow">` tag in `index.html`

## Todo

- make docs with Cloud architecture (see notes on PC)
- make navigation with Vue Router
- add details pages with content section
- deploy on AWS S3, make sure doku is good
- do filter functionality and search functionality, refactor app where needed
- create easy workflow for maintaining the images, like having a folder with all images and having an alias in .bash_aliases for running an rsync for that
	dont forget cashing stuff there... setting it on upload maybe... also for existing ones
