/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'virtual:md' {
  const processor: import('@astrojs/markdown-remark').MarkdownProcessor;

  export default processor;
}

