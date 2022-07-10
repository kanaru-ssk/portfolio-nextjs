// To parse this data:
//
//   import { Convert, AboutPageRes } from "./file";
//
//   const welcome = Convert.toAboutPageRes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface AboutPageRes {
	data: AboutPageResData;
	meta: Meta;
}

export interface AboutPageResData {
	id: number;
	attributes: AboutPage;
}

export interface AboutPage {
	job: string;
	name: string;
	name_kana: string;
	profile_text: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	profile_img: ProfileImg;
	basic_seo: BasicSEO;
	sns: Sn[];
	biography: Biography[];
}

export interface BasicSEO {
	id: number;
	title: string;
	description: string;
	ogp_img: OgpImg;
}

export interface OgpImg {
	data: OgpImgData;
}

export interface OgpImgData {
	id: number;
	attributes: FluffyAttributes;
}

export interface FluffyAttributes {
	name: string;
	alternativeText: string;
	caption: string;
	width: number | null;
	height: number | null;
	formats: PurpleFormats | null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: ProviderMetadata;
	createdAt: Date;
	updatedAt: Date;
}

export interface PurpleFormats {
	large: Small;
	small: Small;
	medium: Small;
	thumbnail: Small;
}

export interface Small {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: null;
	size: number;
	width: number;
	height: number;
	provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
	public_id: string;
	resource_type: ResourceType;
}

export enum ResourceType {
	Image = 'image',
}

export interface Biography {
	id: number;
	time: string;
	title: string;
	note: string;
	jobs: Job[];
	skills: Skills;
	links: Link[];
}

export interface Job {
	id: number;
	name: string;
}

export interface Link {
	id: number;
	title: string;
	url: string;
}

export interface Skills {
	data: Skill[];
}

export interface Skill {
	id: number;
	attributes: TentacledAttributes;
}

export interface TentacledAttributes {
	name: string;
	category: Category;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	icon: OgpImg;
}

export enum Category {
	Lang = 'lang',
	Tool = 'tool',
}

export interface ProfileImg {
	data: ProfileImgData;
}

export interface ProfileImgData {
	id: number;
	attributes: StickyAttributes;
}

export interface StickyAttributes {
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: FluffyFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: ProviderMetadata;
	createdAt: Date;
	updatedAt: Date;
	related: Related;
}

export interface FluffyFormats {
	small: Small;
	thumbnail: Small;
}

export interface Related {
	data: Datum[];
}

export interface Datum {
	id: number;
	attributes: IndigoAttributes;
}

export interface IndigoAttributes {
	__type: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	copy_right?: string;
	job?: string;
	name?: string;
	name_kana?: string;
	profile_text?: string;
}

export interface Sn {
	id: number;
	url: string;
	sns: Sns;
}

export interface Sns {
	data: Skill;
}

export interface Meta {}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
	public static toAboutPageRes(json: string): AboutPageRes {
		return cast(JSON.parse(json), r('AboutPageRes'));
	}

	public static welcomeToJson(value: AboutPageRes): string {
		return JSON.stringify(uncast(value, r('AboutPageRes')), null, 2);
	}
}

function invalidValue(typ: any, val: any, key: any = ''): never {
	if (key) {
		throw Error(
			`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`,
		);
	}
	throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
	if (typ.jsonToJS === undefined) {
		const map: any = {};
		typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
		typ.jsonToJS = map;
	}
	return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
	if (typ.jsToJSON === undefined) {
		const map: any = {};
		typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
		typ.jsToJSON = map;
	}
	return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
	function transformPrimitive(typ: string, val: any): any {
		if (typeof typ === typeof val) return val;
		return invalidValue(typ, val, key);
	}

	function transformUnion(typs: any[], val: any): any {
		// val must validate against one typ in typs
		const l = typs.length;
		for (let i = 0; i < l; i++) {
			const typ = typs[i];
			try {
				return transform(val, typ, getProps);
			} catch (_) {}
		}
		return invalidValue(typs, val);
	}

	function transformEnum(cases: string[], val: any): any {
		if (cases.indexOf(val) !== -1) return val;
		return invalidValue(cases, val);
	}

	function transformArray(typ: any, val: any): any {
		// val must be an array with no invalid elements
		if (!Array.isArray(val)) return invalidValue('array', val);
		return val.map((el) => transform(el, typ, getProps));
	}

	function transformDate(val: any): any {
		if (val === null) {
			return null;
		}
		const d = new Date(val);
		if (isNaN(d.valueOf())) {
			return invalidValue('Date', val);
		}
		return d;
	}

	function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
		if (val === null || typeof val !== 'object' || Array.isArray(val)) {
			return invalidValue('object', val);
		}
		const result: any = {};
		Object.getOwnPropertyNames(props).forEach((key) => {
			const prop = props[key];
			const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
			result[prop.key] = transform(v, prop.typ, getProps, prop.key);
		});
		Object.getOwnPropertyNames(val).forEach((key) => {
			if (!Object.prototype.hasOwnProperty.call(props, key)) {
				result[key] = transform(val[key], additional, getProps, key);
			}
		});
		return result;
	}

	if (typ === 'any') return val;
	if (typ === null) {
		if (val === null) return val;
		return invalidValue(typ, val);
	}
	if (typ === false) return invalidValue(typ, val);
	while (typeof typ === 'object' && typ.ref !== undefined) {
		typ = typeMap[typ.ref];
	}
	if (Array.isArray(typ)) return transformEnum(typ, val);
	if (typeof typ === 'object') {
		return typ.hasOwnProperty('unionMembers')
			? transformUnion(typ.unionMembers, val)
			: typ.hasOwnProperty('arrayItems')
			? transformArray(typ.arrayItems, val)
			: typ.hasOwnProperty('props')
			? transformObject(getProps(typ), typ.additional, val)
			: invalidValue(typ, val);
	}
	// Numbers can be parsed by Date but shouldn't be.
	if (typ === Date && typeof val !== 'number') return transformDate(val);
	return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
	return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
	return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
	return { arrayItems: typ };
}

function u(...typs: any[]) {
	return { unionMembers: typs };
}

function o(props: any[], additional: any) {
	return { props, additional };
}

function m(additional: any) {
	return { props: [], additional };
}

function r(name: string) {
	return { ref: name };
}

const typeMap: any = {
	AboutPageRes: o(
		[
			{ json: 'data', js: 'data', typ: r('AboutPageResData') },
			{ json: 'meta', js: 'meta', typ: r('Meta') },
		],
		false,
	),
	AboutPageResData: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'attributes', js: 'attributes', typ: r('AboutPage') },
		],
		false,
	),
	AboutPage: o(
		[
			{ json: 'job', js: 'job', typ: '' },
			{ json: 'name', js: 'name', typ: '' },
			{ json: 'name_kana', js: 'name_kana', typ: '' },
			{ json: 'profile_text', js: 'profile_text', typ: '' },
			{ json: 'createdAt', js: 'createdAt', typ: Date },
			{ json: 'updatedAt', js: 'updatedAt', typ: Date },
			{ json: 'publishedAt', js: 'publishedAt', typ: Date },
			{ json: 'profile_img', js: 'profile_img', typ: r('ProfileImg') },
			{ json: 'basic_seo', js: 'basic_seo', typ: r('BasicSEO') },
			{ json: 'sns', js: 'sns', typ: a(r('Sn')) },
			{ json: 'biography', js: 'biography', typ: a(r('Biography')) },
		],
		false,
	),
	BasicSEO: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'title', js: 'title', typ: '' },
			{ json: 'description', js: 'description', typ: '' },
			{ json: 'ogp_img', js: 'ogp_img', typ: r('OgpImg') },
		],
		false,
	),
	OgpImg: o([{ json: 'data', js: 'data', typ: r('OgpImgData') }], false),
	OgpImgData: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'attributes', js: 'attributes', typ: r('FluffyAttributes') },
		],
		false,
	),
	FluffyAttributes: o(
		[
			{ json: 'name', js: 'name', typ: '' },
			{ json: 'alternativeText', js: 'alternativeText', typ: '' },
			{ json: 'caption', js: 'caption', typ: '' },
			{ json: 'width', js: 'width', typ: u(0, null) },
			{ json: 'height', js: 'height', typ: u(0, null) },
			{ json: 'formats', js: 'formats', typ: u(r('PurpleFormats'), null) },
			{ json: 'hash', js: 'hash', typ: '' },
			{ json: 'ext', js: 'ext', typ: '' },
			{ json: 'mime', js: 'mime', typ: '' },
			{ json: 'size', js: 'size', typ: 3.14 },
			{ json: 'url', js: 'url', typ: '' },
			{ json: 'previewUrl', js: 'previewUrl', typ: null },
			{ json: 'provider', js: 'provider', typ: '' },
			{ json: 'provider_metadata', js: 'provider_metadata', typ: r('ProviderMetadata') },
			{ json: 'createdAt', js: 'createdAt', typ: Date },
			{ json: 'updatedAt', js: 'updatedAt', typ: Date },
		],
		false,
	),
	PurpleFormats: o(
		[
			{ json: 'large', js: 'large', typ: r('Small') },
			{ json: 'small', js: 'small', typ: r('Small') },
			{ json: 'medium', js: 'medium', typ: r('Small') },
			{ json: 'thumbnail', js: 'thumbnail', typ: r('Small') },
		],
		false,
	),
	Small: o(
		[
			{ json: 'ext', js: 'ext', typ: '' },
			{ json: 'url', js: 'url', typ: '' },
			{ json: 'hash', js: 'hash', typ: '' },
			{ json: 'mime', js: 'mime', typ: '' },
			{ json: 'name', js: 'name', typ: '' },
			{ json: 'path', js: 'path', typ: null },
			{ json: 'size', js: 'size', typ: 3.14 },
			{ json: 'width', js: 'width', typ: 0 },
			{ json: 'height', js: 'height', typ: 0 },
			{ json: 'provider_metadata', js: 'provider_metadata', typ: r('ProviderMetadata') },
		],
		false,
	),
	ProviderMetadata: o(
		[
			{ json: 'public_id', js: 'public_id', typ: '' },
			{ json: 'resource_type', js: 'resource_type', typ: r('ResourceType') },
		],
		false,
	),
	Biography: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'time', js: 'time', typ: '' },
			{ json: 'title', js: 'title', typ: '' },
			{ json: 'note', js: 'note', typ: u(null, '') },
			{ json: 'jobs', js: 'jobs', typ: a(r('Job')) },
			{ json: 'skills', js: 'skills', typ: r('Skills') },
			{ json: 'links', js: 'links', typ: a(r('Link')) },
		],
		false,
	),
	Job: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'name', js: 'name', typ: '' },
		],
		false,
	),
	Link: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'title', js: 'title', typ: '' },
			{ json: 'url', js: 'url', typ: '' },
		],
		false,
	),
	Skills: o([{ json: 'data', js: 'data', typ: a(r('Skill')) }], false),
	Skill: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'attributes', js: 'attributes', typ: r('TentacledAttributes') },
		],
		false,
	),
	TentacledAttributes: o(
		[
			{ json: 'name', js: 'name', typ: '' },
			{ json: 'category', js: 'category', typ: u(undefined, r('Category')) },
			{ json: 'createdAt', js: 'createdAt', typ: Date },
			{ json: 'updatedAt', js: 'updatedAt', typ: Date },
			{ json: 'publishedAt', js: 'publishedAt', typ: Date },
			{ json: 'icon', js: 'icon', typ: u(undefined, r('OgpImg')) },
		],
		false,
	),
	ProfileImg: o([{ json: 'data', js: 'data', typ: r('ProfileImgData') }], false),
	ProfileImgData: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'attributes', js: 'attributes', typ: r('StickyAttributes') },
		],
		false,
	),
	StickyAttributes: o(
		[
			{ json: 'name', js: 'name', typ: '' },
			{ json: 'alternativeText', js: 'alternativeText', typ: '' },
			{ json: 'caption', js: 'caption', typ: '' },
			{ json: 'width', js: 'width', typ: 0 },
			{ json: 'height', js: 'height', typ: 0 },
			{ json: 'formats', js: 'formats', typ: r('FluffyFormats') },
			{ json: 'hash', js: 'hash', typ: '' },
			{ json: 'ext', js: 'ext', typ: '' },
			{ json: 'mime', js: 'mime', typ: '' },
			{ json: 'size', js: 'size', typ: 3.14 },
			{ json: 'url', js: 'url', typ: '' },
			{ json: 'previewUrl', js: 'previewUrl', typ: null },
			{ json: 'provider', js: 'provider', typ: '' },
			{ json: 'provider_metadata', js: 'provider_metadata', typ: r('ProviderMetadata') },
			{ json: 'createdAt', js: 'createdAt', typ: Date },
			{ json: 'updatedAt', js: 'updatedAt', typ: Date },
			{ json: 'related', js: 'related', typ: r('Related') },
		],
		false,
	),
	FluffyFormats: o(
		[
			{ json: 'small', js: 'small', typ: r('Small') },
			{ json: 'thumbnail', js: 'thumbnail', typ: r('Small') },
		],
		false,
	),
	Related: o([{ json: 'data', js: 'data', typ: a(r('Datum')) }], false),
	Datum: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'attributes', js: 'attributes', typ: r('IndigoAttributes') },
		],
		false,
	),
	IndigoAttributes: o(
		[
			{ json: '__type', js: '__type', typ: '' },
			{ json: 'createdAt', js: 'createdAt', typ: Date },
			{ json: 'updatedAt', js: 'updatedAt', typ: Date },
			{ json: 'publishedAt', js: 'publishedAt', typ: Date },
			{ json: 'copy_right', js: 'copy_right', typ: u(undefined, '') },
			{ json: 'job', js: 'job', typ: u(undefined, '') },
			{ json: 'name', js: 'name', typ: u(undefined, '') },
			{ json: 'name_kana', js: 'name_kana', typ: u(undefined, '') },
			{ json: 'profile_text', js: 'profile_text', typ: u(undefined, '') },
		],
		false,
	),
	Sn: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'url', js: 'url', typ: '' },
			{ json: 'sns', js: 'sns', typ: r('Sns') },
		],
		false,
	),
	Sns: o([{ json: 'data', js: 'data', typ: r('Skill') }], false),
	Meta: o([], false),
	ResourceType: ['image'],
	Category: ['lang', 'tool'],
};
