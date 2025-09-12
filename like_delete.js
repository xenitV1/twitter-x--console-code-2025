const waitTimeSeconds = 1;

const sleep = async (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const removeLikes = async () => {
  let lastHeight = 0;

  while (true) {
    // Scroll down the page and load new tweets
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(3);

    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    if (tweets.length === 0) {
      console.log("All likes removed or not loaded, refreshing the page...");
      location.reload();
      await sleep(5);
      continue;
    }

    for (let tweet of tweets) {
      const tweetLink = tweet.querySelector('a[href*="/status/"]');
      if (!tweetLink) continue;
      const tweetId = tweetLink.href.split('/status/')[1].split('?')[0];

      // Check the like icon (match via SVG)
      const likeButton = tweet.querySelector('svg [d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"]');
      if (likeButton) {
        likeButton.closest('button').click(); // Click the like button
        console.log(`Like removed: ${tweetId}`);
        await sleep(waitTimeSeconds); // Wait 1 second
      } else {
        console.log(`Like not found: ${tweetId}, skipping...`);
      }
    }

    // Check if scrolling stopped
    if (document.body.scrollHeight === lastHeight) {
      console.log("No more new tweets loaded, performing final check...");
      await sleep(5);
      if (document.body.scrollHeight === lastHeight) {
        console.log("All likes removed or no more likes to process!");
        break;
      }
    }
    lastHeight = document.body.scrollHeight;
  }
};

removeLikes();