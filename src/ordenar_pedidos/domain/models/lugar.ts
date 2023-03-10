import { Currency } from 'src/shared/domain/vo/currency';
import idVo from 'src/shared/domain/vo/id';
import stringVo from 'src/shared/domain/vo/string';

export class Lugar {
  public id: idVo;
  public nombre: stringVo;
  public tipo: stringVo;
  public precio: Currency;
}
