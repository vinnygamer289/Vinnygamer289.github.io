window.addEventListener("load", function() {
    const thirdPartyScript = document.getElementById("thirdPartyScript");
    const fontsLoaded = document.fonts.ready;
    const scriptLoaded = new Promise(resolve => {
        if (thirdPartyScript) {
            if (thirdPartyScript.getAttribute("data-loaded") === "true") {
                resolve();
            } else {
                thirdPartyScript.onload = resolve;
            }
        } else {
            resolve();
        }
    });
    Promise.all([fontsLoaded, scriptLoaded]).then(function() {
        let loader = document.getElementById("loader");
        let content = document.getElementById("contents");
        if (loader) loader.style.display = "none";
        if (content) content.style.display = "block";
        document.querySelectorAll("img").forEach(img => {
            img.onerror = function() {
                setTimeout(() => {
                    img.src = img.src;
                }, 1000);
            };
        });
        document.querySelectorAll("iframe").forEach(iframe => {
            iframe.onerror = function() {
                setTimeout(() => {
                    iframe.src = iframe.src;
                }, 1000);
            };
        });
    });
});

function adjustStyles() {
    let screenWidth = window.innerWidth;
    let calculatedFontSize = screenWidth / 50;
    let fontSize = Math.max(12, Math.min(calculatedFontSize, 24));
    document.body.style.fontSize = fontSize + "px";
    let paddingBottom = Math.max(20, Math.min(screenWidth / 10, 100));
    document.body.style.paddingBottom = paddingBottom + "px";
    let imageElement = document.querySelector(".thumbnail");
    if (imageElement) {
        let imageWidth = Math.max(100, Math.min(screenWidth * 0.5, 600));
        imageElement.style.width = imageWidth + "px";
        imageElement.style.height = "auto";
    }
}

let resizeObserver;
function onResize() {
    if (resizeObserver) cancelAnimationFrame(resizeObserver);
    resizeObserver = requestAnimationFrame(() => {
        adjustStyles();
    });
}

window.addEventListener("resize", onResize);
document.addEventListener("DOMContentLoaded", adjustStyles);

document.querySelectorAll("a").forEach(link => {
    let longPressTimer = null;
    let longPressTriggered = false;
    function startPress(e) {
        longPressTriggered = false;
        longPressTimer = setTimeout(() => {
            longPressTriggered = true;
            e.preventDefault();
        }, 500);
    }
    function cancelPress() {
        clearTimeout(longPressTimer);
    }
    link.addEventListener("touchstart", startPress);
    link.addEventListener("touchend", cancelPress);
    link.addEventListener("touchcancel", cancelPress);
    link.addEventListener("pointerdown", function(e) {
        if (e.pointerType === "touch") {
            startPress(e);
        }
    });
    link.addEventListener("pointerup", cancelPress);
    link.addEventListener("pointercancel", cancelPress);
    link.addEventListener("click", function(e) {
        if (longPressTriggered) {
            e.preventDefault();
        }
    });
    link.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
});

