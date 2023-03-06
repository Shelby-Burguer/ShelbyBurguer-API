import { classToPlain } from 'class-transformer';

export function toEntity<T, U>(dto: T, entityClass: new () => U): U {
  const entity = new entityClass();
  Object.assign(entity, dto);
  return entity;
}

export function toDTO<T>(entity: T): any {
  return classToPlain(entity);
}
