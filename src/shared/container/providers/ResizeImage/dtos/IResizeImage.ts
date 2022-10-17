export interface IResizeImage {
  xs(image: string): Promise<string>;
  md(image: string): Promise<string>;
  lg(image: string): Promise<string>;
}
