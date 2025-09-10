
```md
# Israel Martínez — Portfolio

A clean, fast, and content-first personal website for my work in **Computer Engineering** and **Data Science**.  
It includes a blog powered by MDX (with posts on **NTN** and **6G**), an **About / CV** page, a **Personal Schedule** page that handles overlapping classes like Google Calendar, and a small gallery.

![Site Preview](/public/images/og/home.jpg)

## Features

- **MDX content** for blog posts and pages.
- **Posts metadata & Open Graph**: automatic SEO tags with dynamic social images.
- **Once UI + Next.js** design system for a cohesive, responsive UI.
- **About / CV** page with structured sections (education, experience, skills).
- **Personal Schedule** weekly view (Mon–Sat, 07:00–21:00) with **overlap-aware layout**.
- **Fast**—static generation with Next.js, ready for Vercel.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Once UI System
- **Content:** MDX
- **Styling:** Utility classes from Once UI + CSS modules
- **Deployment:** Vercel (recommended)

## Project Structure

```

src/
app/
page.tsx                # Home
blog/
page.tsx              # Blog index
\[slug]/page.tsx       # Blog post page (MDX rendering)
posts/                # Your .mdx posts live here
ntn.mdx
6g.mdx
about/
page.tsx              # About / CV
schedule/
page.tsx              # Personal Schedule (overlap-aware)
components/
blog/Posts.tsx
blog/Post.tsx
mdx.tsx
about/TableOfContents.tsx
resources/
index.ts                # exports baseURL, blog, about, person, social
...                     # person/about content you control
public/
images/
og/home.jpg             # preview image

````

## Content Authoring

### Blog posts

Create an MDX file under `src/app/blog/posts/*.mdx` with frontmatter:

```md
---
title: "Non-Terrestrial Networks"
summary: "An intro to NTNs for global 5G/6G connectivity."
image: "/images/gallery/NTN-Featured-Image.png"
publishedAt: "2025-09-25"
tag: "Secure Data Networks"
---
````

Then write your post in MDX.
Tags can be used to filter or group posts if your `Posts` component supports it.

### About / CV

Edit your data in `src/resources` (e.g., `person`, `about`, `social`) or directly in `app/about/page.tsx`.
Sections included: **About me**, **Education**, **Certifications**, **Languages**, **Experience**, **Skills**.

### Personal Schedule

The schedule lives at `src/app/schedule/page.tsx`.
It displays **Mon–Sat** with 30-min grid and lays out **overlapping classes side-by-side** (Google Calendar style).
You can customize time window, colors, and data in the page.

## Getting Started

```bash
# 1) Install dependencies
npm install

# 2) Run dev server
npm run dev
# visit http://localhost:3000
```

> If you add new MDX files or change slugs, rebuild if using full SSG.
> For dynamic content, consider `export const revalidate = 60` (ISR) or `export const dynamic = "force-dynamic"`.

## Deployment

* **Vercel**: push to a Git repo and import the project in Vercel.
* Make sure `baseURL` in `src/resources` points to your production domain for correct OG/SEO metadata.

## Credits & License

* UI & structure inspired by modern Next.js + Once UI workflows.
* Content © 2025 **Israel Martínez Jiménez**.
* You can keep code under your preferred license (MIT recommended) and content under CC BY-NC 4.0 or “All rights reserved”, as you prefer.

```

```
