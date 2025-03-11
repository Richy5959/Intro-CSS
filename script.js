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
            document.getElementById('currency-prices').textContent = `Саня Отец Квартала наш великий Человек!!!! | ${prices.join(' | ')}`;
        } catch (error) {
            document.getElementById('currency-prices').textContent = 'Саня Отец Квартала наш великий Человек!!!! | Failed to load currency prices';
        }
    }

    fetchCurrencyPrices();
    setInterval(fetchCurrencyPrices, 60000); // Update prices every minute

    // Flame animation setup
    const flameCanvas = document.getElementById('flame-canvas');
    const flameCtx = flameCanvas.getContext('2d');
    flameCanvas.width = window.innerWidth;
    flameCanvas.height = 150;

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

    // Snake game setup
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    let food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };
    let score = 0;
    let d;

    document.addEventListener('keydown', direction);

    function direction(event) {
        if (event.keyCode == 37 && d != 'RIGHT') {
            d = 'LEFT';
        } else if (event.keyCode == 38 && d != 'DOWN') {
            d = 'UP';
        } else if (event.keyCode == 39 && d != 'LEFT') {
            d = 'RIGHT';
        } else if (event.keyCode == 40 && d != 'UP') {
            d = 'DOWN';
        }
    }

    function collision(newHead, array) {
        for (let i = 0; i < array.length; i++) {
            if (newHead.x == array[i].x && newHead.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        ctx.fillStyle = '#f4f4f4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? 'green' : 'white';
            ctx.strokeStyle = 'red';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == 'LEFT') snakeX -= box;
        if (d == 'UP') snakeY -= box;
        if (d == 'RIGHT') snakeX += box;
        if (d == 'DOWN') snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        if (snakeX < 0 || snakeX >= 18 * box || snakeY < 0 || snakeY >= 18 * box || collision(newHead, snake)) {
            clearInterval(game);
        }

        snake.unshift(newHead);

        ctx.fillStyle = 'white';
        ctx.font = '45px Changa one';
        ctx.fillText(score, 2 * box, 1.6 * box);
    }

    let game = setInterval(draw, 100);
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
