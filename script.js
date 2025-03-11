document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme based on preference or default to light theme
    if (!document.body.classList.contains('dark-theme') && !document.body.classList.contains('light-theme')) {
        document.body.classList.add('light-theme');
    }
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});
