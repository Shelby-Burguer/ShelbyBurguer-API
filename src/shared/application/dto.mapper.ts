import { classToPlain } from 'class-transformer';

export function toEntity<T, U>(dto: T, entityConstructor: new () => U): U {
  const entity = new entityConstructor();
  Object.assign(entity, dto);
  return entity;
}

export function toDTO<T>(entity: T): any {
  return classToPlain(entity);
}
