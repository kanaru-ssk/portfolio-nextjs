// 環境変数の型定義
namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
    readonly NEXT_PUBLIC_DOMAIN: string;
    readonly WP_API_URL: string;
    readonly SENDGRID_API_KEY: string;
  }
}
