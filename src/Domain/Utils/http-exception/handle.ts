export class HttpException {
  constructor(message: string, code: number) {
    let error: Error & { code?: number } = new Error(message);

    error.code = code;

    throw error;
  }
}
