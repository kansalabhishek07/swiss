document.getElementById('connectWalletButton').addEventListener('click', async function () {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access if needed
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        
        // Get the connected account and balance
        const account = accounts[0];
        const balance = await provider.getBalance(account);
        
        // Update the UI
        document.getElementById('accountAddress').textContent = `Account: ${account}`;
        document.getElementById('tokenBalance').textContent = `Balance: ${ethers.utils.formatEther(balance)} ETH`;
        document.getElementById('walletInfo').classList.remove('hidden');
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask to use this feature.");
    }
  });
  