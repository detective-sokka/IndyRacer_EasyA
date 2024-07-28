document.getElementById('generate-skin').addEventListener('click', async () => {
    const userPrompt = prompt("Enter a description for the skin:");
    if (!userPrompt) return;

    const loader = document.getElementById('loader');
    const skinImage = document.getElementById('skin-image');
    const mintButton = document.getElementById('mint-button');

    // Show loader and hide previous image and mint button
    loader.style.display = 'block';
    skinImage.style.display = 'none';
    mintButton.style.display = 'none';

    try {
        const response = await fetch('http://localhost:3000/generate-skin', { // Ensure the correct endpoint is used
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userPrompt })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            skinImage.src = data.imageUrl;
            localStorage.setItem("skinUrl", data.imageUrl);
            skinImage.onload = () => {
                skinImage.style.display = 'block';
                mintButton.style.display = 'block'; // Show the mint button when the image is loaded
            };
        } else {
            console.error('Error generating skin:', response.statusText);
        }
    } catch (error) {
        console.error('Error generating skin:', error);
    } finally {
        // Hide loader once the request is complete
        loader.style.display = 'none';
    }
});

// Mint button click event handler
document.getElementById('mint-button').addEventListener('click', async () => {
    const skinImage = document.getElementById('skin-image').src;
    if (!skinImage) return;

    try {
        const response = await fetch('http://localhost:3000/mint-nft', { // Ensure the correct endpoint is used
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageData: localStorage.getItem("skinUrl") })
        });

        if (response.ok) {
            const result = await response.json();
            alert(`NFT minted with ID: ${result.tokenId}`);
        } else {
            console.error('Error minting NFT:', response.statusText);
        }
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
});
