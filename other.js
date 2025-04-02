function removeUnusedCSS() {
const sheets = document.styleSheets;
const usedSelectors = new Set();
let totalRemovedSize = 0;
let removedSelectors = [];

document.querySelectorAll('*').forEach(element => {
if (element.classList.length) {
element.classList.forEach(cls => usedSelectors.add('.' + cls));
}
if (element.id) {
usedSelectors.add('#' + element.id);
}
usedSelectors.add(element.tagName.toLowerCase());
});

Array.from(sheets).forEach(sheet => {
try {
const rules = sheet.cssRules || sheet.rules;
if (!rules) return;

for (let j = rules.length - 1; j >= 0; j--) {    
    const rule = rules[j];    
    if (!rule.selectorText) continue;    
        
    const selectors = rule.selectorText.split(',').map(s => s.trim());    
           
    let isUsed = selectors.some(sel => {    
      if (usedSelectors.has(sel) || sel === '*') return true;    
      try {    
        const element = document.querySelector(sel);    
        if (element) {    
          const hasJsAttr = Array.from(element.attributes)    
            .some(attr => attr.name.startsWith('js'));    
          return hasJsAttr || true;    
        }    
        return false;    
      } catch (e) {     
        return true;    
      }    
    });    
        
    if (!isUsed) {
      if (/nth-child/.test(rule.selectorText)) continue;
      if (rule.cssText.indexOf("display: none") > -1) continue;
      if (/img|body|html|:root|.download-list a|\*|fa-|::before|::after|:hover/.test(rule.selectorText)) continue;    
          
      totalRemovedSize += rule.cssText.length;    
      removedSelectors.push(rule.selectorText);    
      sheet.deleteRule(j);    
    }    
  }    
} catch (e) {    
  console.warn('Unable to access stylesheet:', sheet.href);    
}

});

console.log(`Deleted ${(totalRemovedSize / 1024).toFixed(2)} KB of unused CSS.`);
console.log("Selectors have been removed:", removedSelectors);
}

document.addEventListener("DOMContentLoaded", removeUnusedCSS);

