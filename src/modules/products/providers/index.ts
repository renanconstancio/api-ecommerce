import { container } from 'tsyringe';
import { IResizeImage } from './model/IResizeImage';
import ResizeImage from './ResizeImage/ResizeImage';

container.registerSingleton<IResizeImage>('ResizeImage', ResizeImage);
