# Setting up your diary — step by step

You don't need to know how to code for any of this. Just follow along.

## 1. Make a GitHub account
Go to github.com and sign up (free). This is where your site will live.

## 2. Create the repository
- Click the **+** in the top right → **New repository**
- Name it something like `our-diary`
- Leave it set to **Public** (this is required for the free hosting — more on what this means for privacy at the bottom)
- Click **Create repository**

## 3. Upload these files
On your new repo's page, click **Add file → Upload files**, then drag in all 5 files from this folder:
`index.html`, `style.css`, `script.js`, `entries.json`, `README.md`
Scroll down, click **Commit changes**.

## 4. Turn on the website
- Go to the **Settings** tab of your repo → **Pages** (left sidebar)
- Under "Branch", choose **main**, folder **/(root)**, click **Save**
- Wait about a minute, refresh — you'll see a link like:
  `https://yourusername.github.io/our-diary/`

That link is your website. Anyone you send it to can open it and read it, but they can't change anything.

## 5. Give your girlfriend edit access
- Settings → **Collaborators** (left sidebar) → **Add people**
- Enter her GitHub username or email, send the invite
- Once she accepts, she can edit too. No one else can.

## 6. Adding a new diary entry (no coding — works from a phone too)
- Open your repo on github.com, click on `entries.json`
- Click the **pencil icon** (top right of the file) to edit
- Copy one of the existing entry blocks and add a comma, then paste a new one like this:

```json
{
  "date": "2026-08-02",
  "title": "Your title here",
  "body": "What happened. Write as much as you want.\n\nLeave a blank line for a new paragraph.",
  "image": ""
}
```
- Click **Commit changes** at the bottom. The site updates automatically within a minute.

## 7. Adding a photo
- On the repo page: **Add file → Upload files**, upload the photo (e.g. `beach-day.jpg`)
- In `entries.json`, set `"image": "beach-day.jpg"` for that entry

## About privacy — what "public repo" actually means
GitHub's free hosting requires the repo to be technically "public," but that's exactly what you asked for: it just means anyone with the link can view it. It does **not** mean anyone can edit — only you and the collaborators you explicitly invite can ever change or delete anything. Nobody can "hack" it without your GitHub password, and GitHub itself has proper account security (turn on **two-factor authentication** in your GitHub account settings for extra safety).

The only realistic exposure is that someone would need to know or guess your exact repo name to stumble on it outside the link — it won't show up for random searches. If you want zero chance of that, pick a repo name that isn't obviously about the two of you (e.g. `midnight-thread` instead of `[names]-diary`).

## Optional: a real custom domain later
Right now your link is `yourusername.github.io/our-diary`. If down the road you want something like `oursince2024.com`, you'd buy that domain (~$10–12/year from a registrar like Namecheap or Porkbun) and point it at your GitHub Pages site — that part does cost a small yearly fee since domain names always do, but everything else stays exactly the same and free.
