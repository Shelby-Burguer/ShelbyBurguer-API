import { toDTO, toEntity } from 'src/shared/application/dto.mapper';
import { plainToClass } from 'class-transformer';

interface Mapper<TDto, TDomain> {
  toDomain(dto: TDto): TDomain;
  toDto(domain: TDomain): TDto;
}

export class GenericMapper<TDto, TDomain> implements Mapper<TDto, TDomain> {
  constructor(
    private dtoClass: new () => TDto,
    private domainClass: new () => TDomain,
  ) {}

  toDomain(dto: TDto): TDomain {
    return toEntity(dto, this.domainClass);
  }

  toDto(domain: TDomain): TDto {
    return plainToClass(this.dtoClass, toDTO(domain));
  }
}
