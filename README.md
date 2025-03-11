To suggest new recipes, send an e-mail to hello@lchristmann.com!

# Recipe App <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [1. Basics](#1-basics)
  - [1.1 Requirements](#11-requirements)
  - [1.2 Installations](#12-installations)
  - [1.3 The App's Origin](#13-the-apps-origin)
  - [1.4 Development](#14-development)
  - [1.5 Images](#15-images)
    - [1.5.1 Managing the images](#151-managing-the-images)
    - [1.5.2 Optimizing the images](#152-optimizing-the-images)
  - [1.6 Build](#16-build)
  - [1.7 Custom Node.js scripts](#17-custom-nodejs-scripts)
- [2. Testing](#2-testing)
- [3. Cloud Infrastructure](#3-cloud-infrastructure)
- [4. Deployment (CI/CD Pipeline)](#4-deployment-cicd-pipeline)
- [5. Negative SEO](#5-negative-seo)
- [6. App Content](#6-app-content)
- [7. Development Roadmap](#7-development-roadmap)
  - [7.1. Ideas Playground](#71-ideas-playground)

<br>

## 1. Basics

### 1.1 Requirements

This project uses [Vite](https://vite.dev), which requires **Node.js version 18+ or 20+**.

<br>

### 1.2 Installations

Run `npm install` to install project dependencies (which are specified in `package.json`).

<br>

### 1.3 The App's Origin

> Not relevant for working on this, **just FYI**. This project was created by

- executing `npm init vite recipe-app`
- following the [TailwindCSS installation instructions](https://tailwindcss.com/docs/installation/using-vite) and
  - adding the `@import "tailwindcss";` to `src/style.css`

<br>

### 1.4 Development

Run `npm run dev`.

<br>

### 1.5 Images

> **RULE:** Images must be named like the recipe title specified in `src/assets/recipes/*.json`,<br>&nbsp;&nbsp;&nbsp;&nbsp;but lowercase and with whitespaces replaced by hyphens, e.g. Pommes Bowl -> pommes-bowl.webp<br>
> &nbsp;&nbsp;&nbsp;&nbsp;German Umlaute must be transcribed according to the following rules: ä -> 'ae', ö -> 'oe', ü -> 'ue', ß -> 'ss'.

When adding an image to public/images and you want to see that while developing (locally), run `npm run generate:manifest`.

For deployment, this is not needed, because in the `build` script, this command is already included.

#### 1.5.1 Managing the images

For managing the images, I wrote three custom npm scripts:

- `npm run show:missing-images`
- `npm run validate:images`

#### 1.5.2 Optimizing the images

Optimizations I have to taken already:

- using lazy loading on images of the recipes list, which are "below the fold" (not on screen for the user): only the first five images are eagerly loaded
- using an image format with best efficiency (compression and quality): WebP
- having caching (set to two weeks) for the whole app and distribution via CDN (AWS CloudFront) -> fast global delivery with few roadtrips to the source (S3 bucket is the source, see [Cloud Infrastructure](#3-cloud-infrastructure))
- include images in a small resolution and roughly 2/1 aspect ratio (but 3/1 in the recipe list should also look fine)
  - somethig like 1200 x 600 is very good

<br>

### 1.6 Build

Run `npm run build`. You can then view this build ("have it served") with `npm run preview`.

<br>

### 1.7 Custom Node.js scripts

This project uses a lot of custom Node.js scripts which can be found in the `/scripts` folder of this project.

They can be executed via `node scripts/<nameOfTheScript>` or via the npm commands shown below (or see `package.json`).

`aggregateRecipes.js`:
- processes all single recipe JSON files `src/assets/recipes/[main,side,supper,dessert]/*.json` into aggregate JSON files `src/assets/recipes/[main,side,supper,dessert].json`
- and adds the properties `hasImage` and (if so) `imageUrl` also to the single recipe JSON files

`cleanRecipes.js`: removes those added `hasImage` and (if so) `imageUrl` properties - a helper script to keep that unnecessary data away from version control

`createRecipe.js`: can be called like `npm run create main/neues-rezept` and creates an appropriate starting template JSON file

`generateLabelsManifest`:
- looks for all unique labels in the respective labels arrays of the aggregate JSON files and writes them to a `labelsManifest.json` for the `SearchAndFilter.vue` component to know which labels exist and shall be displayed in the dropdown.

`showMissingImages`: shows all recipes that don't have an image yet

`validateImages`: validates that all files in the image category directories are [WEBP](https://developers.google.com/speed/webp?hl=de) files and can be associated with a recipe JSON file (the filename of both must be the same, it's just different extensions)

`validateRecipes`: checks that the recipe JSONs are in correct format (allowed properties and data types)

<br>

## 2. Testing

The [Vitest](https://vitest.dev/guide/) Unit Tests in the tests/unit folder can be run with `npm run test`.


<br>
## 3. Cloud Infrastructure

The following diagram shows the [Amazon Web Services](https://aws.amazon.com) cloud infrastructure the site is running on.

![Cloud Architecture Diagram](documentation/cloud-architecture.drawio.svg)

It's a classic static website hosting via S3 and CloudFront setup.

Note that the [Origin-Access-Control](https://aws.amazon.com/de/about-aws/whats-new/2022/08/amazon-cloudfront-origin-access-control/) is used to only enable CloudFront to access the S3 bucket.

For having the subdomain with an own SSL certificate

- one CNAME record had to be added to `lchristmann.com` as verification of domain ownership towards AWS Certificate Manager
- one A record with an alias to the CloudFront distribution

<br>

## 4. Deployment (CI/CD Pipeline)

Deployment is automated with a GitHub Actions CI/CD pipeline which is triggered by every commit in the Git repository (see `.github/workflows/cicd.yml`).

<br>

## 5. Negative SEO

Since this is purely a hobby project, there's no point in having it indexed by search engines.

Therefor they are discouraged from crawling and indexing it at all by

- the `robots.txt `file
- the `<meta name="robots" content="noindex, nofollow">` tag in `index.html`

<br>

## 6. App Content

Recipe JSON files must be kebab case (lowercase and words separated by hyphens). They are allowed to contain German umlauts, like "käsekuchen".

Labels are generated by the `npm run generate:labels-manifest` command (that's only possible after the `npm run aggregate:recipes` command, because the labels generation uses the aggregate JSON files). To see the existing labels, you can run both commands and look at the `src/assets/recipes/labelsManifest.json` or just run `npm run dev` or `npm run build`, which will run both commands, too.

To create a new recipe, there's a helper script that you can use: `npm run create main/rezept-name`.

<br>

## 7. Development Roadmap

### 7.1. Ideas Playground

- have the whole recipes JSON data `src/assets/recipes` in the cloud only and develop a `recipe-app-manager` application in another repository, with which I can manage the recipes from anywhere
  - I can create new recipe JSON files via the GitHub Mobile App already though, so it's not too bad already