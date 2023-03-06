import { IValueObject } from '../IValueObjects';
import messageException from '../mesageExeptions';

export default class idVo implements IValueObject {
  private constructor(readonly id: string) {}

  public equals(valueObject: idVo): boolean {
    return this.id === valueObject.getId();
  }

  public getId() {
    return this.id;
  }

  public static create(id: string) {
    if (id == undefined || id == null) {
      throw new messageException('El id no puede estar vacio');
    }

    if (
      !id.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      )
    ) {
      throw new messageException('El id no posee la estructura correcta');
    }

    return new idVo(id);
  }
}
