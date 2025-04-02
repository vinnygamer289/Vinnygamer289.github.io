    window.onload = function() {
      const images = document.querySelectorAll('img');
      const maxWidth = 800;
      const maxHeight = 600;

      images.forEach(img => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = function() {
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);

          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let quality = 0.7 + 0.3 * ratio;
          if (quality > 1) quality = 1;
          const compressedDataUrl = canvas.toDataURL('image/webp', quality);

          img.src = compressedDataUrl;
        };

        if (img.complete) {
          img.onload();
        }
      });
    };
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
function detectEruda() {
    if (typeof eruda !== 'undefined') {
        try {
            eruda.destroy();
            document.getElementById('eruda')?.remove();
        } catch (e) {}
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
    detectEruda();
}, );