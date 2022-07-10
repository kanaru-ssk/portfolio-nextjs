// 環境変数の型定義
namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_PRODUCTION_DOMAIN: string;
		readonly NEXT_PUBLIC_DOMAIN: string;
		readonly STRAPI_API_URL: string;
		readonly SENTGRID_API_KEY: string;
		readonly CONTACT_MAIL_ADDRESS: EmailData;
		readonly FORM_MAIL_ADDRESS: EmailData;
	}
}

// Any element you create will be accepted
declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

// The elements you list here will be accepted, attributes don't matter
declare namespace JSX {
	interface IntrinsicElements {
		'amp-img': any;
	}
}

// The elements you list here will be accepted, and only with the attributes that you include here
declare namespace JSX {
	interface AmpImg {
		alt?: string;
		src?: string;
		width: string;
		height: string;
		layout?: string;
	}
	interface IntrinsicElements {
		'amp-img': AmpImg;
	}
}
