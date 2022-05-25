export function getStrapiMedia(media: any) {
	const { url } = media.data.attributes;
	const imageUrl = url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL + url : url;
	return imageUrl;
}
