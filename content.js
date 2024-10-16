// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Change the theme based on user selection
  if (request.action === 'changeTheme') {
      document.body.className = ''; // Reset any existing theme class
      document.body.classList.add(request.theme); // Set the body's class to the selected theme
  }

  // Change the font based on user selection
  else if (request.action === 'changeFont') {
      document.body.style.fontFamily = request.font; // Apply the selected font to the body
  }

  // Remove ads from the current page
  else if (request.action === 'removeAds') {
      const ads = document.querySelectorAll('.ad, .advertisement, [id*="ad"]'); // Select ad elements by common classes and ID patterns
      ads.forEach(ad => ad.remove()); // Remove each ad element found

      // Create and display a message indicating ads have been removed
      const message = document.createElement('div');
      message.textContent = 'Ads have been successfully removed!';
      message.style.position = 'fixed';
      message.style.top = '10px';
      message.style.right = '10px';
      message.style.padding = '10px';
      message.style.backgroundColor = '#4CAF50'; // Green background
      message.style.color = 'white'; // White text
      message.style.borderRadius = '5px';
      message.style.zIndex = '10000'; // Ensure it's above other elements
      document.body.appendChild(message);

      // Remove the message after a few seconds
      setTimeout(() => {
          message.remove();
      }, 3000);
  }
});
