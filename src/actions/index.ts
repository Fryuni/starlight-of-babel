import * as zlib from 'node:zlib';
import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);

export const server = {
  findEntry: defineAction({
    input: z.object({
      content: z.string(),
    }),
    async handler({ content }) {
      const buf = Buffer.from(content, 'ascii');
      const compressed = await gzip(buf, {
        level: zlib.constants.Z_BEST_COMPRESSION,
        strategy: zlib.constants.Z_MAX_LEVEL,
      });

      return compressed.toString('base64url');
    }
  }),
};
