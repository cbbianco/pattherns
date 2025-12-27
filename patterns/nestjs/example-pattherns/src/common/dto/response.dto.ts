export class ResponseDto<T> {
  succes: boolean;
  data: T;
  message: string;
}
