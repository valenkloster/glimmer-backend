import axios from 'axios';
import config from '../../../config.js';

class ShippingService {
  constructor() {
    // Crear token en base64
    const auth = Buffer.from(
      `${config.zippinApiKey}:${config.zippinApiSecret}`,
    ).toString('base64');

    this.api = axios.create({
      baseURL: 'https://api.zippin.com.ar/v2/',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getCosts(items, direction) {
    const body = {
      account_id: '16949',
      origin_id: '360674',
      declared_value: 0,
      items: items.map((item) => ({
        weight: item.weight,
        height: item.height,
        width: item.width,
        length: item.length,
        description: item.description,
        classification_id: 1,
      })),
      destination: {
        city: direction.city,
        state: direction.state,
        zipcode: direction.zipcode,
      },
    };

    try {
      const response = await this.api.post('shipments/quote', body);
      return response.data.results.standard_delivery;
    } catch (error) {
      throw new Error(`Error getting shipping costs: ${error.message}`);
    }
  }
}

export default ShippingService;
