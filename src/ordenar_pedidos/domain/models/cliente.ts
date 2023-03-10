import idVo from '../../../shared/domain/vo/id';
import stringVo from '../../../shared/domain/vo/string';

export class Cliente {
  public id: idVo;
  public cedula: stringVo;
  public nombre: stringVo;
  public apellido: stringVo;
  public telefono: stringVo;
}
