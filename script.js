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
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
