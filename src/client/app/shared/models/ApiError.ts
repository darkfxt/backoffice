export class ApiError {
  code: string;
  message: string;
  response: {
    code: number,
    message: string
  };
  stack: any;
  constructor() {}
}
