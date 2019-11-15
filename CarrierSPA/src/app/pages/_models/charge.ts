export interface Charge {
  id: any;
  userId: any;
  cityId: any;
  userName: string;
  cityName: string;
  createdAt: Date;
  chargeDetails: ChargeDetail[]
}

export interface ChargeDetail {
  id: any;
  chargeId: any;
  chargeType: string;
  amount: any;
  moreInfo: string;
  createdAt: Date;
}
