export interface DataMapper<Domain, Entity> {
  toDomain(entity: Entity): Domain;
  toDalEntity(domain: Domain): Entity;
}
