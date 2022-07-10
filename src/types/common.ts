// To parse this data:
//
//   import { Convert, CommonRes } from "./file";
//
//   const welcome = Convert.toCommonRes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CommonRes {
	data: CommonResData;
	meta: Meta;
}

export interface CommonResData {
	id: number;
	attributes: Common;
}

export interface Common {
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	copy_right: string;
	favicon: Favicon;
	header_logo: Favicon;
	logo_white: Favicon;
}

export interface Favicon {
	data: FaviconData;
}

export interface FaviconData {
	id: number;
	attributes: FluffyAttributes;
}

export interface FluffyAttributes {
	name: string;
	alternativeText: string;
	caption: string;
	width: null;
	height: null;
	formats: null;
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

export interface ProviderMetadata {
	public_id: string;
	resource_type: string;
}

export interface Meta {}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
	public static toCommonRes(json: string): CommonRes {
		return cast(JSON.parse(json), r('CommonRes'));
	}

	public static welcomeToJson(value: CommonRes): string {
		return JSON.stringify(uncast(value, r('CommonRes')), null, 2);
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
	CommonRes: o(
		[
			{ json: 'data', js: 'data', typ: r('CommonResData') },
			{ json: 'meta', js: 'meta', typ: r('Meta') },
		],
		false,
	),
	CommonResData: o(
		[
			{ json: 'id', js: 'id', typ: 0 },
			{ json: 'attributes', js: 'attributes', typ: r('Common') },
		],
		false,
	),
	Common: o(
		[
			{ json: 'createdAt', js: 'createdAt', typ: Date },
			{ json: 'updatedAt', js: 'updatedAt', typ: Date },
			{ json: 'publishedAt', js: 'publishedAt', typ: Date },
			{ json: 'copy_right', js: 'copy_right', typ: '' },
			{ json: 'favicon', js: 'favicon', typ: r('Favicon') },
			{ json: 'header_logo', js: 'header_logo', typ: r('Favicon') },
			{ json: 'logo_white', js: 'logo_white', typ: r('Favicon') },
		],
		false,
	),
	Favicon: o([{ json: 'data', js: 'data', typ: r('FaviconData') }], false),
	FaviconData: o(
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
			{ json: 'width', js: 'width', typ: null },
			{ json: 'height', js: 'height', typ: null },
			{ json: 'formats', js: 'formats', typ: null },
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
	ProviderMetadata: o(
		[
			{ json: 'public_id', js: 'public_id', typ: '' },
			{ json: 'resource_type', js: 'resource_type', typ: '' },
		],
		false,
	),
	Meta: o([], false),
};
