
export interface RegisterData {
  user: string;
  email: string;
  pass: string;
}

export interface RegisterResponse {
  data: RegisterData;
}