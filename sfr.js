/*
stupid-font-renderer
Rebuild a page's text out of mini glyphs from another font

code (should ideally be) in this order:
-config and consts
-reonconstruction
-worker pool
-glyph to css
-replacement
-js modal
-running it
*/

(() => {
    if (window.__sfr) {
        window.__sfr.show();
        return;
    }

/*config */

    const GENERIC_FAMILIES = [
        'sans-serif',
        'serif',
        'monospace',
        'cursive',
        'fantasy',
        'system-ui',
        'ui-monospace',
        'emoji',
        'math'
    ]

    const SKIP_SELECTOR = 
        'script, style, noscript, textarea, select, option ,svg, canvas, [data-gl]';

    const MASK_PADDING_EM = 0.15
    const DOM_CHUNK = 200;
    const tick = () => new Promise(resolve => setTimeout(resolve, 0));

})();