import { Lugar } from '../models/lugar';

export interface ILugarRepository {
  findById(id: string): Promise<Lugar | undefined>;
  findByNombre(nombre: string): Promise<Lugar | undefined>;
  findAllByTipo(tipo: string): Promise<Lugar[] | undefined>;
  findAll(): Promise<Lugar[]>;
  create(lugar: Lugar): Promise<void>;
  update(id: string, lugar: Lugar): Promise<void>;
  delete(id: string): Promise<void>;
}
