// UserRepository.ts (Capa de dominio)

import { Lugar } from '../models/lugar';

export interface LugarRepository {
  findById(id: string): Promise<Lugar | undefined>;
  findByNombre(nombre: string): Promise<Lugar | undefined>;
  findAll(): Promise<Lugar[]>;
  create(lugar: Lugar): Promise<Lugar>;
  update(lugar: Lugar): Promise<Lugar>;
  delete(id: string): Promise<void>;
}
