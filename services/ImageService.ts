import {ImageGateway} from '../gateways/ImageGateway';

export class ImageService {
  private imageGateway: ImageGateway;

  constructor(options: {imageGateway: ImageGateway}) {
    this.imageGateway = options.imageGateway;
  }

  public async uploadImage(file: File): Promise<string> {
    const linkUpload = await this.imageGateway.getLinkUpload(
      file.type.substring(file.type.indexOf('/') + 1, file.type.length),
    );

    return await this.imageGateway.uploadImageWithLink(file, linkUpload.link);
  }
}
