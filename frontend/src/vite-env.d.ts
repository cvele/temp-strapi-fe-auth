/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AVATAR_API: string
    readonly VITE_API: string
    readonly VITE_AUTH_TOKEN: string
    readonly VITE_BEARER: string
    readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
