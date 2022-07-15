import path from 'path';
import sharp from 'sharp';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  config: { fit: sharp.fit.inside, withoutEnlargement: true },
  pathResolve: uploadFolder,
  pathResolveXs: `${uploadFolder}/xs`,
  pathResolveMd: `${uploadFolder}/md`,
};
