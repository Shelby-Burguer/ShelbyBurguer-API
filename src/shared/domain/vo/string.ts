import { IValueObject } from '../IValueObjects';
import messageException from '../mesageExeptions';

export default class stringVo implements IValueObject {
  constructor(private readonly name: string) {}

  equals(valueObject: stringVo): boolean {
    return this.name === valueObject.getString();
  }

  public getString() {
    return this.name;
  }

  public static create(name: string) {
    if (name == undefined || name == null) {
      throw new messageException(
        'La casilla no puede estar vacia',
      );
    }

    return new stringVo(name);
  }
}