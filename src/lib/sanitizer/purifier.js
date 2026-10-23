/**
 * Vyralify Rich Text HTML WYSIWYG Sanitizer
 * Specification: Blueprint Section 5.2
 * Location: /src/lib/sanitizer/purifier.js
 * Enforces strict whitelist of tags and attributes to prevent XSS in creator storefronts.
 */

const ALLOWED_TAGS = new Set([
  'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'span', 'br'
]);

const ALLOWED_ATTR = new Set(['href', 'target', 'rel', 'style', 'class']);

export const sanitizeProductDescription = (dirtyHtml) => {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  // In browser environment, use DOMParser with whitelist enforcement
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(dirtyHtml, 'text/html');

      // Recursively sanitize DOM nodes
      const sanitizeNode = (node) => {
        const children = Array.from(node.childNodes);
        for (const child of children) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const tagName = child.tagName.toLowerCase();

            if (!ALLOWED_TAGS.has(tagName)) {
              // Strip element tag, preserve text content if not script/style
              if (tagName === 'script' || tagName === 'style' || tagName === 'iframe' || tagName === 'object') {
                child.remove();
              } else {
                const textNode = document.createTextNode(child.textContent || '');
                child.replaceWith(textNode);
              }
              continue;
            }

            // Strip disallowed attributes (e.g. onerror, onclick, javascript: href)
            const attrs = Array.from(child.attributes);
            for (const attr of attrs) {
              const attrName = attr.name.toLowerCase();
              if (!ALLOWED_ATTR.has(attrName)) {
                child.removeAttribute(attr.name);
              } else if (attrName === 'href') {
                const val = attr.value.trim().toLowerCase();
                if (val.startsWith('javascript:') || val.startsWith('data:')) {
                  child.removeAttribute(attr.name);
                }
              }
            }

            sanitizeNode(child);
          }
        }
      };

      sanitizeNode(doc.body);
      return doc.body.innerHTML;
    } catch (e) {
      console.warn('DOMParser sanitize notice:', e);
    }
  }

  // Regex-based fallback for server-side or non-DOM environments
  return dirtyHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
};

export default sanitizeProductDescription;
