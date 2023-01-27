import { IValueObject } from '../IValueObjects';
import messageException  from '../mesageExeptions';

export default class numberVo implements IValueObject {
  private constructor(readonly id: number) {}

  public equals(valueObject: numberVo): boolean {
    return this.id === valueObject.getNumber();
  }

  public getNumber() {
    return this.id;
  }

  public static create(id: number) {
    if (id == undefined || id == null) {
      throw new messageException(
        'La casilla no puede estar vacia',
      );
    }

    return new numberVo(id);
  }
}