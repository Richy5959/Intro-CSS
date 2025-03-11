document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme based on preference or default to light theme
    if (!document.body.classList.contains('dark-theme') && !document.body.classList.contains('light-theme')) {
        document.body.classList.add('light-theme');
    }

    // Function to update the clocks
    function updateClocks() {
        const kyivTime = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Kiev' });
        const slovakiaTime = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Bratislava' });

        document.getElementById('kyiv-time').textContent = kyivTime;
        document.getElementById('slovakia-time').textContent = slovakiaTime;
    }

    // Update the clocks every second
    setInterval(updateClocks, 1000);
    updateClocks(); // Initial call to display the time immediately

    // Fetch and display currency prices
    async function fetchCurrencyPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,bitcoin-cash,cardano,polkadot,litecoin,chainlink,stellar,usd&vs_currencies=usd');
            const data = await response.json();
            const prices = [
                `BTC: $${data.bitcoin.usd}`,
                `ETH: $${data.ethereum.usd}`,
                `XRP: $${data.ripple.usd}`,
                `BCH: $${data['bitcoin-cash'].usd}`,
                `ADA: $${data.cardano.usd}`,
                `DOT: $${data.polkadot.usd}`,
                `LTC: $${data.litecoin.usd}`,
                `LINK: $${data.chainlink.usd}`,
                `XLM: $${data.stellar.usd}`,
                `USD: $${data.usd.usd}`
            ];
            document.getElementById('currency-prices').textContent = prices.join(' | ');
        } catch (error) {
            document.getElementById('currency-prices').textContent = 'Failed to load currency prices';
        }
    }

    fetchCurrencyPrices();
    setInterval(fetchCurrencyPrices, 60000); // Update prices every minute
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
