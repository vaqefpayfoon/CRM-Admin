export interface User {
  id: any;
  username: string;
  password: string;
  oldPassword: string;
  fullName: string;
  nationalCode: string;
  cityName: string;
  cityId: any;
  dateOfBirth: Date;
  moreInfo: string;
  photoUrl: string;
  userRole: string;
  email: string;
  phone: string;
  file: File;
}
export interface UserDto {
  age: number;
  CityId: any;
  cityName: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  id: any
  nationalCode: string;
  phone: string;
  photoUrl: string;
  userRole: string;
  username: string;
}
