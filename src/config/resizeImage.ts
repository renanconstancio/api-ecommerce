import path from 'path';
import sharp from 'sharp';
import { getMonth, getYear } from 'date-fns';

const dateNow = new Date();
const yearNow = getYear(dateNow);
const monthNow = getMonth(dateNow);

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const waterMark = path.resolve(__dirname, '..', '..', 'uploads/watermark.jpg');

export default {
  config: { fit: sharp.fit.contain, background: 'white' },
  pathResolve: `${uploadFolder}/${yearNow}/${monthNow}`,
  pathResolveXs: `${uploadFolder}/xs/${yearNow}/${monthNow}`,
  pathResolveMd: `${uploadFolder}/md/${yearNow}/${monthNow}`,
  waterMark,
};
