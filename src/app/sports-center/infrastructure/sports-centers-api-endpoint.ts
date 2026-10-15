import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { SportsCenterResource } from './sports-center.resource';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SportsCenterAssembler } from './sports-center.assembler';

export class SportsCentersApiEndpoint extends BaseApiEndpoint<SportsCenter, SportsCenterResource> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformBaseApiUrl}${environment.sportsCenterEndpointPath}`,
      new SportsCenterAssembler()
    );
  }
}
