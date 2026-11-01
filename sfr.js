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
