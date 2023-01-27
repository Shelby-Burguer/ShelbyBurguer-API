export interface IException {
  readonly message: string;
  showError(): string;
}
