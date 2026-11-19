# Canyon Natinsky portfolio

The editable project is `/Users/canyon/Documents/cn-portfolio`.
This is the source of truth for the portfolio at https://www.canyonnatinsky.com.
The November 19, 2026 reconciliation restores the content, styles, images,
résumé, and hosting files from the supplied FTP download into this project.

## The repeatable update routine

1. Open **cn-portfolio** in your editor. If you also edit from another computer,
   pull the latest changes in your Git app before starting.
2. Double-click **Preview Website.command**. A local browser preview opens;
   leave its Terminal window running while editing. Saved changes appear there.
3. Edit the source files listed below. Check the preview at desktop and phone
   widths, including navigation, experience cards, animation, and résumé links.
   Separate apps under `/projects/` are previewed from their own projects.
4. Save everything, then double-click **Build Website.command**. On success,
   Finder opens **upload/portfolio**. Each build recreates that folder and its
   ZIP; changes made inside generated folders will be overwritten.
5. Review the changed files in your Git app, enter a short description, and
   **Commit**, then **Push**. GitHub stores the source; pushing does not upload
   the website. `node_modules`, `dist`, and `upload` are intentionally ignored.
6. Open the existing website root in Cyberduck: the folder already containing
   the portfolio's `index.html`, `assets`, `web.config`, and `projects`.
   Upload the **contents** of `upload/portfolio` there. Do not create another
   `portfolio` directory and do not upload the source project or the ZIP.
7. Upload **assets first**, merging with the server's existing `assets` folder
   and overwriting matching files. Upload the root icons and the remaining
   files next, with **index.html last**. Merge folders; do not delete or replace
   the website root, turn on deletion/sync, or remove old server assets as part
   of a routine upload. Leave the server's **projects** folder alone.
8. Open https://www.canyonnatinsky.com and refresh with **Command–Shift–R**.
   Check the page, navigation, images, résumé, and ATC Ops link. Stop the local
   preview with **Control-C** in its Terminal window when done.

If a build fails, fix the error and build again before uploading anything.
The shortcuts only build or preview locally; neither uploads nor commits.
Node.js and npm must be installed; dependencies install automatically when
needed. The first build on a new computer needs an internet connection.

## Where to make changes

| Change | Edit this local source |
| --- | --- |
| Biography, age, experience, project cards, contact links, metadata | `index.html` |
| Colors, spacing, desktop and mobile layout | `src/style.css` |
| Smooth scrolling and hamburger menu | `src/main.ts` |
| Bio/zoom animations, timeline durations, card click behavior | Inline scripts near the bottom of `index.html` |
| Résumé | Replace `public/assets/files/resume.pdf` using the same filename |
| Project images and sharing image | `public/assets/images/` |
| Icons, search-engine files, maintenance page, IIS settings | Files directly inside `public/` |

Files in `public/` are copied to the website root during the build. For example,
`public/assets/files/resume.pdf` becomes `/assets/files/resume.pdf` online.
Use stable public URLs such as `/assets/images/atc-ops.webp` in the source.
Vite creates the final JavaScript and stylesheet filenames automatically.
Do not paste generated `/assets/index-....js` or `.css` filenames into the source.

The separate **projects** folder is excluded from this repository and upload
package. Its apps keep their own source, builds, and deployment process.
Portfolio project cards still belong to this portfolio's `index.html`.

## If you accidentally edit the live website

Download the changed live file into a temporary folder first. Copy the intended
content changes into this project's source, then preview, rebuild, commit, push,
and upload normally. Do not replace the local source `index.html` with the built
server copy: its generated asset paths do not belong in the editable source.
For a changed résumé or image, replace the matching file under `public/` locally.

## Optional Terminal commands

Run these from `/Users/canyon/Documents/cn-portfolio`:

```sh
npm ci
npm run dev
npm run release
git status
git diff
git add -A
git commit -m "Update portfolio content"
git push origin main
```

Review `git status` and `git diff` before staging. The release command compiles
the website, checks portfolio asset references, and creates `upload/portfolio`
plus `upload/portfolio.zip`. The ZIP contains a `portfolio` wrapper folder;
extract it locally and upload that folder's contents if using the ZIP.
`npm run preview` serves the most recent `dist` build for a final local check.

The existing CDN animation libraries and Google Fonts are preserved from the
FTP version and need internet access for the same appearance and animations.
The supplied IIS `web.config` is retained; the local preview does not emulate
its server redirects or MIME configuration.
