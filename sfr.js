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

/*font utils*/
    const fontAvailibility = new Map();
    /*font is considered "installed" if it changes its width compared with the generic fallback ones*/
    /*least jank way to do it for sure lol*/

    const hasFont = name => {
        if (fontAvailibility.has(name)) {
            return fontAvailibility.get(name);
        }
    
    const ctx = document.createElement('canvas').getContext('2d');
    const sample = 'mmmmmmmmlliWW@#';

    const found = [
        'monospace',
        'serif',
        'sans-serif'
    ].some(fallback => {
        ctx.font = `72px ${name}, ${fallback}`;
        const baseline = ctx.measureText(sample).width;
        ctx.font = `72px "${fallback}"`;
        return ctx.measureText(sample).width !== baseline;
    });
    fontAvailibility.set(name, found);
    return found;
    }


    /*split css dont family val into plain names*/
    const parseFontList = cssVal => {
        const names = [];
        const pattern = /"([^"]*)"|'([^']*)'|([^,]+)/g;

        let match;
        while ((match = pattern.exec(cssValue))) {
            const raw = 
                match[1] !== undefined
                    ? match[1]
                    : match[2] !== undefined
                        ? match[2]
                        : match[3];
            const name = raw.replace(/[;"']/g, '').trim();

            if (name && !GENERIC_FAMILIES.includes(name.toLowerCase())) {
                names.push(name);
            }
        }
        return names;
    };

    const pickFont = cssValue =>
        parseFontList(cssValue).find(hasFont);

    const isWebFont = name =>
        [...document.fonts].some(
            f =>
                f.family.replace(/["']/g, '').toLowerCase() ===
                name.toLowerCase()
        );

/*get alpha masks*/
    /*how do i do this exactly*/

    function makeEngine(makeCanvas) {
        const BASE_BLOCK_PX = 20
        const MAX_EM_PX = 1200;
        const MIN_EM_PX = 80

        const geometry = p => {
            const emPx = Math.max (
                MIN_EM_PX, Math.min(MAX_EM_PX, p.res * BASE_BLOCK_PX / p.mult)
            );
            const blockPx = emPx/p.res*p.mult;

            return {
                emPx, blockPx, pad: Math.ceil(blockPx * 1.2) + 16
            };
        };

        /*render a source glyph then excract its alpha channel*/

        const extractMask = (fontOf, ch, emPx, pad) => {
            const canvas = makeCanvas(8, 8);
            const ctx = canvas.getContext('2d', { willReadFrequently: true })
            ctx.font = fontOf(emPx);
            const m = ctx.measureText(ch);

            

        }
    }


})();