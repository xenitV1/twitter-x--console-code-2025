# Twitter/X Tweet Deleter (Console Script)

This repository contains a small JavaScript snippet to help automate deleting your own tweets from Twitter/X via the browser console.

## Files

- `tweet-delete.js`: The script you can run in the browser console while logged into X.

## How to Use

1. Open `https://x.com/` (Twitter/X) and log in to the account whose tweets you want to delete.
2. Navigate to your profile so your tweets are visible.
3. Open Developer Tools → Console:
   - Chrome/Edge: `Ctrl+Shift+J` (Windows) or `Cmd+Option+J` (macOS)
4. Paste the contents of `tweet-delete.js` into the console and press Enter.
5. The script will:
   - Scroll down to load tweets
   - Open the tweet menu
   - Click the Delete option
   - Confirm deletion

If X’s interface or test IDs change, selectors may need to be updated.

## Notes & Warnings

- This script is intended only for deleting your own tweets.
- Use at your own risk. Twitter/X UI and policies change frequently.
- Deleting many tweets quickly may trigger rate limits or additional verification.

## Alternative: Userscript

If you prefer a one-click approach, you can adapt `tweet-delete.js` into a userscript for Tampermonkey/Greasemonkey by saving it as `twitter-delete.user.js` and adding a proper userscript header. Then install it in your browser and enable it on `https://x.com/*`.

## License

MIT
