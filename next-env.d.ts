/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// 環境変数の型定義
namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_MICROCMS_API_KEY: string;
		readonly NEXT_PUBLIC_MICROCMS_ENDPOINT_CUSTOM: string;
	}
}
