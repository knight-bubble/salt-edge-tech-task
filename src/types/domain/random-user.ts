export interface RandomUser {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type Id = {
  name: string;
  value: string;
};

export type Location = {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
};

export type Login = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

export type Dob = {
  date: string;
  age: number;
};

export type Registered = {
  date: string;
  age: number;
};

export type Name = {
  title: string;
  first: string;
  last: string;
};
