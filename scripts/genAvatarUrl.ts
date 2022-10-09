import { IAvatar } from 'interfaces/models/avatar';

export const genAvatarUrl = (avatar: IAvatar | null, resolution: string) => {
  if(!avatar) return null
  return `http://localhost:5000/api/user/avatar/file?path=images/avatars/${avatar._id}/1200x1200.webp&resize=${resolution}`
};
