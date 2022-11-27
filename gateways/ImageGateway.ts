import axios, {AxiosInstance} from 'axios';

export class ImageGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async getLinkUpload(tailFile: string): Promise<{link: string}> {
    const {data} = await this.restConnector.post(`/upload/avatar`, {
      extension: tailFile,
      method: 'PUT',
    });
    return data;
  }

  public async uploadImageWithLink(file: File, link: string): Promise<string> {
    try {
      await axios({
        url: link,
        method: 'put',
        headers: {
          'Content-Type': file.type,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers':
            'Content-Type, Authorization, X-Requested-With',
        },
        data: file,
      });
    } catch (e) {
      console.log('Error upload image to storage');
    }

    return link.substring(0, link.indexOf('?'));
  }
}
