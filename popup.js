document.getElementById("apply-theme").addEventListener("click", () => {
    const selectedTheme = document.getElementById("theme-select").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeTheme', theme: selectedTheme });
    });
});

document.getElementById("apply-font").addEventListener("click", () => {
    const selectedFont = document.getElementById("font-select").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeFont', font: selectedFont });
    });
});

document.getElementById("remove-ads").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'removeAds' });
    });
});

document.getElementById("generate-pdf").addEventListener("click", () => {
    const url = document.getElementById("url-input").value.trim();
    
    if (!url) {
        alert("Please enter a valid URL.");
        return;
    }

    // Show loading message and reset progress bar
    document.getElementById("definition").innerText = "Generating PDF, please wait...";
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.display = "block";
    progressBar.value = 0;

    const apiKey = 'rizwanahamed2726@gmail.com_nCKqJAzwFt9CoLJTpYVjkZJ15fIng4f0amQUKpfhywrEpyqhW5onHMOmneR5V6bQ'; // Replace with your actual PDF.co API key

    fetch('https://api.pdf.co/v1/pdf/convert/from/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify({ url: url, name: 'output.pdf' })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.message);
        }
        // File URL to download
        const downloadUrl = data.url;
        progressBar.value = 100; // Set progress to complete
        alert("PDF generated successfully! Download link: " + downloadUrl);
    })
    .catch(err => {
        console.error("Error generating PDF: ", err);
        alert("An error occurred while generating the PDF.");
    })
    .finally(() => {
        progressBar.style.display = "none";
        progressBar.value = 0;
    });

    // Simulate progress update (for demonstration purposes)
    const interval = setInterval(() => {
        if (progressBar.value < 100) {
            progressBar.value += 10; // Increment by 10 for demo purposes
        } else {
            clearInterval(interval);
        }
    }, 300); // Update every 300ms
});

document.getElementById("get-definition").addEventListener("click", () => {
    const word = document.getElementById("word-input").value.trim();
    if (!word) {
        alert("Please enter a word to look up.");
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const definition = data[0]?.meanings[0]?.definitions[0]?.definition;
            if (definition) {
                document.getElementById("definition").innerText = definition;
            } else {
                document.getElementById("definition").innerText = "Definition not found.";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("definition").innerText = "Error retrieving definition.";
        });
});
