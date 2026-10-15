/**
 * @summary Contract for assemblers that convert API resources into domain entities.
 * @author Roberto Gonzales Ayala
 */
export interface BaseAssembler<TEntity, TResource> {
  toEntityFromResource(resource: TResource): TEntity;
  toEntitiesFromResponse(response: TResource[]): TEntity[];
}
