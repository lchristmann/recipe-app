# Recipe App <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [1. Basics](#1-basics)
	- [1.1 Requirements](#11-requirements)
	- [1.2 Installations](#12-installations)
	- [1.3 The App's Origin](#13-the-apps-origin)
	- [1.4 Development](#14-development)
	- [1.5 Images](#15-images)
	- [1.6 Build](#16-build)
- [2. Negative SEO](#2-negative-seo)
- [3. TODO](#3-todo)

<br>

## 1. Basics

### 1.1 Requirements

This project uses [Vite](https://vite.dev), which requires **Node.js version 18+ or 20+**.

### 1.2 Installations

Run `npm install` to install project dependencies (which are specified in `package.json`).

### 1.3 The App's Origin

> Not relevant for working on this, **just FYI**. This project was created by

- executing `npm init vite recipe-app`
- following the [TailwindCSS installation instructions](https://tailwindcss.com/docs/installation/using-vite) and
  - adding the `@import "tailwindcss";` to `src/style.css`

### 1.4 Development

Run `npm run dev`.

### 1.5 Images

> **RULE:** Images must be named like the recipe title specified in `src/assets/recipes/*.json`,<br>&nbsp;&nbsp;&nbsp;&nbsp;but lowercase and with whitespaces replaced by hyphens, e.g. Pommes Bowl -> pommes-bowl.webp

When adding an image to public/images and you want to see that while developing (locally), run `npm run generate:manifest`.

For deployment, this is not needed, because in the `build` script, this command is already included.

### 1.6 Build

Run `npm run build`. You can then view this build ("have it served") with `npm run preview`.

<br>

## 2. Negative SEO

Since this is purely a hobby project, there's no point in having it indexed by search engines.

Therefor they are discouraged from crawling and indexing it at all by

- the `robots.txt `file
- the `<meta name="robots" content="noindex, nofollow">` tag in `index.html`

<br>

## 3. TODO

- make navigation with Vue Router
- add details pages with content section
- deploy on AWS S3 and put diagram of cloud architecture here
- do filter functionality and search functionality, refactor app where needed