import idVo from '../../../shared/domain/vo/id';
import stringVo from '../../../shared/domain/vo/string';

export class ingrediente {
  public id: idVo;
  public nombre: stringVo;
  public unidad: stringVo;
  public objectURL: string;
  public nombreImagen: string;
  public datosImagen: Uint8Array;
  public proteina: stringVo;
}
