import * as zlib from 'node:zlib';
import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

export const server = {
  findEntry: defineAction({
    accept: 'form',
    input: z.object({
      content: z.string(),
    }),
    async handler({ content }) {
      const buf = Buffer.from(content, 'ascii');
      const compressed = await gzip(buf, {
        level: zlib.constants.Z_BEST_COMPRESSION,
      });

      return compressed.toString('base64url');
    }
  }),
  expandEntry: defineAction({
    input: z.object({
      entry: z.string(),
    }),
    async handler({ entry }) {
      const buf = Buffer.from(entry, 'base64url');
      const decompressed = await gunzip(buf);
      return decompressed.toString('ascii');
    }
  })
};
