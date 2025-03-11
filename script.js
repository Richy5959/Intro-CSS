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
    const flameWidth = flameCanvas.width;
    const flameHeight = flameCanvas.height;
    const particles = [];
    const colors = ['#ff4500', '#ff8c00', '#ffd700', '#ff69b4', '#ff1493'];

    function createParticle() {
        return {
            x: Math.random() * flameWidth,
            y: flameHeight,
            size: Math.random() * 5 + 2,
            speedY: Math.random() * 1 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.03 + 0.01
        };
    }

    function drawFlame() {
        flameCtx.clearRect(0, 0, flameWidth, flameHeight);

        particles.forEach((particle, index) => {
            flameCtx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.alpha})`;
            flameCtx.beginPath();
            flameCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            flameCtx.fill();

            particle.y -= particle.speedY;
            particle.alpha -= particle.decay;

            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        while (particles.length < 100) {
            particles.push(createParticle());
        }

        requestAnimationFrame(drawFlame);
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r},${g},${b}`;
    }

    drawFlame();
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
