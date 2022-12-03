import path from 'path';
import sharp from 'sharp';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const waterMark = path.resolve(__dirname, '..', '..', 'uploads/watermark.jpg');

export default {
  config: { fit: sharp.fit.inside, withoutEnlargement: true },
  // config: {
  //   fit: sharp.fit.cover,
  //   background: 'white',
  //   withoutEnlargement: true,
  // },
  pathResolve: uploadFolder,
  pathResolveXs: `${uploadFolder}/xs`,
  pathResolveMd: `${uploadFolder}/md`,
  waterMark,
};
