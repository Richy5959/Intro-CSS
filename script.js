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

    // Flame animation setup
    const flameCanvas = document.getElementById('flame-canvas');
    const flameCtx = flameCanvas.getContext('2d');
    const flameColors = ['#ff4500', '#ff8c00', '#ffd700', '#ff69b4', '#ff1493'];
    let flameIndex = 0;

    function drawFlame() {
        flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);

        flameCtx.fillStyle = flameColors[flameIndex];
        flameCtx.beginPath();
        flameCtx.moveTo(flameCanvas.width / 2, flameCanvas.height);
        flameCtx.lineTo(flameCanvas.width / 2 - 20, flameCanvas.height - 50);
        flameCtx.lineTo(flameCanvas.width / 2 + 20, flameCanvas.height - 50);
        flameCtx.closePath();
        flameCtx.fill();

        flameIndex = (flameIndex + 1) % flameColors.length;
        requestAnimationFrame(drawFlame);
    }

    drawFlame();
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
