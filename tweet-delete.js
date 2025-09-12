const waitTimeSeconds = 1;

const sleep = async (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const deleteTweets = async () => {
  let lastHeight = 0;

  while (true) {
    // Scroll down the page and load new tweets
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(3);

    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    if (tweets.length === 0) {
      console.log("All tweets deleted or not loaded, refreshing the page...");
      location.reload(); // Refresh the page and check again
      await sleep(5); // Wait after refresh
      continue;
    }

    for (let tweet of tweets) {
      const tweetLink = tweet.querySelector('a[href*="/status/"]');
      if (!tweetLink) continue;
      const tweetId = tweetLink.href.split('/status/')[1].split('?')[0];

      const caret = tweet.querySelector('[data-testid="caret"]');
      if (caret) {
        caret.click();
        await sleep(1);

        // Find all menu items in the dropdown
        const menuItems = document.querySelectorAll('[role="menuitem"]');
        let deleteOption = null;
        for (let item of menuItems) {
          const text = item.textContent.toLowerCase();
          if (text.includes('delete')) {
            deleteOption = item;
            break;
          }
        }

        if (deleteOption) {
          deleteOption.click();
          await sleep(1);

          const confirm = document.querySelector('[data-testid="confirmationSheetConfirm"]');
          if (confirm) {
            confirm.click();
            console.log(`Deleted: ${tweetId}`);
          }
        } else {
          console.log("Delete option not found, closing menu...");
          caret.click(); // Close the menu
          await sleep(1);
        }
      }

      await sleep(waitTimeSeconds); // Wait 1 second
    }

    // Check if scrolling stopped (no new content loaded)
    if (document.body.scrollHeight === lastHeight) {
      console.log("No more new tweets loaded, performing final check...");
      await sleep(5); // One last chance to load
      if (document.body.scrollHeight === lastHeight) {
        console.log("All tweets deleted or no more tweets to load!");
        break;
      }
    }
    lastHeight = document.body.scrollHeight;
  }
};

deleteTweets();
