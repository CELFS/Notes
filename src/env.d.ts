/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_IMAGE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
