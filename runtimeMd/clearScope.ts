import type { MarkdownProcessor, AstroMarkdownOptions } from "@astrojs/markdown-remark";

type Factory = () => Promise<MarkdownProcessor>;

export function clearScopeFactory(config: AstroMarkdownOptions): Factory {
  return async () => {
    const { createMarkdownProcessor, markdownConfigDefaults } = await import('@astrojs/markdown-remark');

    return createMarkdownProcessor({
      ...config,
      remarkPlugins: [
        ...markdownConfigDefaults.remarkPlugins,
        ...config.remarkPlugins ?? [],
      ],
      rehypePlugins: [
        ...markdownConfigDefaults.rehypePlugins,
        ...config.rehypePlugins ?? [],
      ],
    });
  }
}
