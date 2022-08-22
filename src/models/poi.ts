export class Result {
  data?: NonNullable<any>;
  message?: string = '';
  code?: 0 | 1 | 2 | 3 | 4 | 5 = 0;
  constructor(data?: NonNullable<any>) {
    this.data = data;
  }
}

export class GeoPOI {
  /** 经度 */
  lat?: string | number = 0;
  /** 维度 */
  lng?: string | number = 0;
  geotype?: 1 | 2 = 2;
  /** 兴趣点 */
  poi?: string = '';
}

export class PickedPOI {
  /** 经度 */
  lat?: string | number = 0;
  /** 维度 */
  lng?: string | number = 0;
  geotype?: 1 | 2 = 2;
  /** 兴趣点 */
  poi?: string = '';
  /** 地址（行政街道门牌） */
  address?: string = '';
}

export class SelectedAddr {
  address?: string = '';
  addressId?: string = '';
  addressType?: string = '';
  gender?: string = '';
  geotype?: 1 | 2 = 2;
  lat?: string | number = '';
  lng?: string | number = '';
  name?: string = '';
  phone?: string = '';
  poi?: string = '';
}

export class Poi {
  address?: string = '';
  addressName?: string = '';
  geoPOI: GeoPOI = new GeoPOI();
  geotype = 2;
  /** 初始化纬度 */
  initialLat: string | number = 0;
  /** 初始化经度 */
  initialLng: string | number = 0;
  /** 纬度 */
  lat: string | number = 0;
  /** 经度 */
  lng: string | number = 0;

  /** 选择地址 */
  pickedPOI: PickedPOI = new PickedPOI();

  /** 选择地址 */
  selectedAddr?: SelectedAddr;
}
