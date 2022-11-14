import Tag from './Tag';

type ImageMetadata = {
	id: number,
	userId: number,
	title: string,
	description: string,
	url: string,
	timestampCreated: string,
	timestampUpdated: string,
	published: boolean,
	tags: Tag[],
}

export default ImageMetadata;