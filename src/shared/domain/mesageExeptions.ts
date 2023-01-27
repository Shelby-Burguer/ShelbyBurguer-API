import { IException } from './iException';

export default class messageException extends Error implements IException {
  constructor(public readonly message: string) {
    super(message);
  }

  public showError(): string {
    return this.message;
  }
}
