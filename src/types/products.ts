// To parse this data:
//
//   import { Convert, ProductsRes } from "./file";
//
//   const welcome = Convert.toProductsRes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ProductsRes {
  data: Products[];
  meta: Meta;
}

export interface Products {
  id: number;
  attributes: Product;
}

export interface Product {
  path: string;
  heading: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  basic_seo: BasicSEO;
  eye_catch: EyeCatch;
}

export interface BasicSEO {
  id: number;
  title: string;
  description: string;
  ogp_img: EyeCatch;
}

export interface EyeCatch {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
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
  related?: Related;
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
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
  Image = "image",
}

export interface Related {
  data: RelatedDatum[];
}

export interface RelatedDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  __type: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  copy_right?: string;
  catch_copy?: string;
  contents?: string;
  form_text?: string;
  success_text?: string;
  error_text?: string;
  path?: string;
  heading?: string;
  job?: string;
  name?: string;
  name_kana?: string;
  profile_text?: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toProductsRes(json: string): ProductsRes {
    return cast(JSON.parse(json), r("ProductsRes"));
  }

  public static welcomeToJson(value: ProductsRes): string {
    return JSON.stringify(uncast(value, r("ProductsRes")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
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

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
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
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
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
  ProductsRes: o(
    [
      { json: "data", js: "data", typ: a(r("Products")) },
      { json: "meta", js: "meta", typ: r("Meta") },
    ],
    false
  ),
  Products: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "attributes", js: "attributes", typ: r("Product") },
    ],
    false
  ),
  Product: o(
    [
      { json: "path", js: "path", typ: "" },
      { json: "heading", js: "heading", typ: "" },
      { json: "contents", js: "contents", typ: "" },
      { json: "createdAt", js: "createdAt", typ: Date },
      { json: "updatedAt", js: "updatedAt", typ: Date },
      { json: "publishedAt", js: "publishedAt", typ: Date },
      { json: "basic_seo", js: "basic_seo", typ: r("BasicSEO") },
      { json: "eye_catch", js: "eye_catch", typ: r("EyeCatch") },
    ],
    false
  ),
  BasicSEO: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "title", js: "title", typ: "" },
      { json: "description", js: "description", typ: "" },
      { json: "ogp_img", js: "ogp_img", typ: r("EyeCatch") },
    ],
    false
  ),
  EyeCatch: o([{ json: "data", js: "data", typ: r("Data") }], false),
  Data: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "attributes", js: "attributes", typ: r("DataAttributes") },
    ],
    false
  ),
  DataAttributes: o(
    [
      { json: "name", js: "name", typ: "" },
      { json: "alternativeText", js: "alternativeText", typ: "" },
      { json: "caption", js: "caption", typ: "" },
      { json: "width", js: "width", typ: 0 },
      { json: "height", js: "height", typ: 0 },
      { json: "formats", js: "formats", typ: r("Formats") },
      { json: "hash", js: "hash", typ: "" },
      { json: "ext", js: "ext", typ: "" },
      { json: "mime", js: "mime", typ: "" },
      { json: "size", js: "size", typ: 3.14 },
      { json: "url", js: "url", typ: "" },
      { json: "previewUrl", js: "previewUrl", typ: null },
      { json: "provider", js: "provider", typ: "" },
      {
        json: "provider_metadata",
        js: "provider_metadata",
        typ: r("ProviderMetadata"),
      },
      { json: "createdAt", js: "createdAt", typ: Date },
      { json: "updatedAt", js: "updatedAt", typ: Date },
      { json: "related", js: "related", typ: u(undefined, r("Related")) },
    ],
    false
  ),
  Formats: o(
    [
      { json: "large", js: "large", typ: r("Large") },
      { json: "small", js: "small", typ: r("Large") },
      { json: "medium", js: "medium", typ: r("Large") },
      { json: "thumbnail", js: "thumbnail", typ: r("Large") },
    ],
    false
  ),
  Large: o(
    [
      { json: "ext", js: "ext", typ: "" },
      { json: "url", js: "url", typ: "" },
      { json: "hash", js: "hash", typ: "" },
      { json: "mime", js: "mime", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "path", js: "path", typ: null },
      { json: "size", js: "size", typ: 3.14 },
      { json: "width", js: "width", typ: 0 },
      { json: "height", js: "height", typ: 0 },
      {
        json: "provider_metadata",
        js: "provider_metadata",
        typ: r("ProviderMetadata"),
      },
    ],
    false
  ),
  ProviderMetadata: o(
    [
      { json: "public_id", js: "public_id", typ: "" },
      { json: "resource_type", js: "resource_type", typ: r("ResourceType") },
    ],
    false
  ),
  Related: o([{ json: "data", js: "data", typ: a(r("RelatedDatum")) }], false),
  RelatedDatum: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "attributes", js: "attributes", typ: r("FluffyAttributes") },
    ],
    false
  ),
  FluffyAttributes: o(
    [
      { json: "__type", js: "__type", typ: "" },
      { json: "createdAt", js: "createdAt", typ: Date },
      { json: "updatedAt", js: "updatedAt", typ: Date },
      { json: "publishedAt", js: "publishedAt", typ: Date },
      { json: "copy_right", js: "copy_right", typ: u(undefined, "") },
      { json: "catch_copy", js: "catch_copy", typ: u(undefined, "") },
      { json: "contents", js: "contents", typ: u(undefined, "") },
      { json: "form_text", js: "form_text", typ: u(undefined, "") },
      { json: "success_text", js: "success_text", typ: u(undefined, "") },
      { json: "error_text", js: "error_text", typ: u(undefined, "") },
      { json: "path", js: "path", typ: u(undefined, "") },
      { json: "heading", js: "heading", typ: u(undefined, "") },
      { json: "job", js: "job", typ: u(undefined, "") },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "name_kana", js: "name_kana", typ: u(undefined, "") },
      { json: "profile_text", js: "profile_text", typ: u(undefined, "") },
    ],
    false
  ),
  Meta: o(
    [{ json: "pagination", js: "pagination", typ: r("Pagination") }],
    false
  ),
  Pagination: o(
    [
      { json: "page", js: "page", typ: 0 },
      { json: "pageSize", js: "pageSize", typ: 0 },
      { json: "pageCount", js: "pageCount", typ: 0 },
      { json: "total", js: "total", typ: 0 },
    ],
    false
  ),
  ResourceType: ["image"],
};
