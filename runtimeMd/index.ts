import { withPlugins, defineIntegration } from "astro-integration-kit";
import { markdownConfigDefaults as defaultConfig } from '@astrojs/markdown-remark';
import type { AstroConfig } from 'astro';
import aikMod, { asyncFactory, lazyValue } from '@inox-tools/aik-mod';
import { clearScopeFactory } from "./clearScope";

type MarkdownConfig = Omit<AstroConfig['markdown'],
  | 'shikiConfig'
>;

export default defineIntegration({
  name: 'runtime-md',
  setup({ name }) {
    const value = lazyValue<any>();

    return withPlugins({
      name,
      plugins: [aikMod],
      hooks: {
        'astro:config:setup': ({ defineModule }) => {
          defineModule('virtual:md', {
            defaultExport: value,
            serializeFn: (val) => {
              return typeof val !== 'function' || val.name !== 'ssrDynamicImport';
            }
          });
        },
        'astro:config:done': async ({ config: { markdown } }) => {
          const { shikiConfig, ...kept } = markdown;
          const config: MarkdownConfig = { ...kept };

          for (const plugin of defaultConfig.remarkPlugins) {
            config.remarkPlugins.splice(config.remarkPlugins.indexOf(plugin), 1);
          }

          for (const plugin of defaultConfig.rehypePlugins) {
            config.rehypePlugins.splice(config.rehypePlugins.indexOf(plugin), 1);
          }

          (value.resolve as any)(asyncFactory(clearScopeFactory({})))
        }
      },
    });
  },
})
