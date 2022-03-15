export default class ErrorResponse extends Error {
  constructor(message: string, public statusCode: number, public errorCode: string) {
    super(message);
  }
}
