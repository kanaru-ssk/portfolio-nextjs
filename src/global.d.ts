// 環境変数の型定義
namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_MICROCMS_DOMAIN: string;
		readonly NEXT_PUBLIC_MICROCMS_API_KEY: string;
		readonly NEXT_PUBLIC_MICROCMS_ENDPOINT_CUSTOM: string;
	}
}
