import { IImage } from 'interfaces/models/image';

export const genImageUrl = (
  image: IImage | null | undefined,
  resolution: string
) => {
  if(!image) return null
  return `http://localhost:5000/api/shots/images/file?path=images/shots/${image.shot}/${image._id}/2560x1920.webp&resize=${resolution}`
};
