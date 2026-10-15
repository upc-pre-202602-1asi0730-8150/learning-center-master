import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseAssembler } from './base-assembler';

/**
 * @summary Base class for API endpoints. Fetches resources and converts them to entities with an assembler.
 * @author Roberto Gonzales Ayala
 */
export abstract class BaseApiEndpoint<TEntity, TResource> {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: BaseAssembler<TEntity, TResource>,
  ) {}

  /** Gets all resources of the endpoint as domain entities. */
  getAll(): Observable<TEntity[]> {
    return this.http
      .get<TResource[]>(this.endpointUrl)
      .pipe(map((response) => this.assembler.toEntitiesFromResponse(response)));
  }
}
