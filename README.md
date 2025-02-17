# Recipe App <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [1. Basics](#1-basics)
	- [1.1 Requirements](#11-requirements)
	- [1.2 Installations](#12-installations)
	- [1.3 The App's Origin](#13-the-apps-origin)
	- [1.4 Development](#14-development)
	- [1.5 Images](#15-images)
		- [1.5.1 Managing the images](#151-managing-the-images)
	- [1.6 Build](#16-build)
	- [1.7 Custom Node.js scripts](#17-custom-nodejs-scripts)
- [2. Testing](#2-testing)
- [3. Cloud Infrastructure](#3-cloud-infrastructure)
- [4. Deployment (CI/CD Pipeline)](#4-deployment-cicd-pipeline)
- [5. Negative SEO](#5-negative-seo)
- [6. TODO](#6-todo)

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

- `npm run images:missing`: shows all images missing for recipes
- `npm run images:verify`: runs both of the following scripts
  - `npm run images:verify:format`: checks that all images are in the lightweight [WebP image format](https://developers.google.com/speed/webp?hl=de)
  - `npm run images:verify:association`: checks that all images can be associated with a recipe

<br>

### 1.6 Build

Run `npm run build`. You can then view this build ("have it served") with `npm run preview`.

<br>

### 1.7 Custom Node.js scripts

This project uses a lot of custom Node.js scripts which can be found in the `/scripts` folder of this project.

They can be executed via `node scripts/<nameOfTheScript>` or via the npm commands shown below (or see `package.json`).

- **generateImagesManifest.js:** `npm run generate:manifest`
  - reads the `public/images/<category>` directories and puts the information into a JSON file `src/assets/imagesManifest.json` so the application knows immediately what images it has and which not (see `src/components/RecipeList.vue` and `src/views/RecipeView.vue`)

- **generateRecipeIds.js:** `npm run generate:recipe-ids`
  - goes through the recipes JSON files in `src/assets/recipes` and adds the `id` property with an incrementing value to every recipe object there - this makes it that I don't have to write and maintain indices

- **verifyExistingImagesAssociation.js:** `npm run images:verify:association`
  - checks every image file in `public/images/<category>` directories against the set of expected image names from the recipes in `src/assets/recipes/*.json` files

- **verifyExistingImagesFormat.js:** `npm run images:verify:format`
  - checks that all files in `public/images/<category>` directories bear the WebP file extension (that's the only allowed image format), because it's much more efficient than others

- **findMissingImages.js:** `npm run images:missing`
  - prints all recipes in `src/assets/recipes/<category>.json` that have no image associated to them in `public/images/<category>`
  
I defined two groups of execution: `npm run generate` and `npm run images:verify` that each summarize two commands.

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

Deployment is automated with a GitHub Actions CI/CD pipeline.

![CI/CD Pipeline](documentation/cicd-pipeline.drawio.svg)

This pipeline is triggered by every commit in the Git repository.

<br>

## 5. Negative SEO

Since this is purely a hobby project, there's no point in having it indexed by search engines.

Therefor they are discouraged from crawling and indexing it at all by

- the `robots.txt `file
- the `<meta name="robots" content="noindex, nofollow">` tag in `index.html`

<br>

## 6. TODO

- do filter functionality and search functionality, refactor app where needed
- implement that ids are generated automatically in json files with npm script