/// <reference types="vite/client" />
interface ImportMetaEnv {
  /**
   * node上的环境变量
   */
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
