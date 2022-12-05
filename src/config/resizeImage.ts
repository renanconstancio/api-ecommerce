import path from 'path';
import sharp from 'sharp';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const waterMark = path.resolve(__dirname, '..', '..', 'uploads/watermark.jpg');

export default {
  // config: { fit: sharp.fit.inside, withoutEnlargement: true },
  config: { fit: sharp.fit.contain, background: 'white' },
  pathResolve: uploadFolder,
  pathResolveXs: `${uploadFolder}/xs`,
  pathResolveMd: `${uploadFolder}/md`,
  waterMark,
};
