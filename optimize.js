function detectDevTools() {
    const start = performance.now();
    debugger;
    const timeTaken = performance.now() - start;
    if (timeTaken > 5) {
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || 
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) || 
        (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
    }
});

setInterval(() => {
    detectDevTools();
}, 1000);