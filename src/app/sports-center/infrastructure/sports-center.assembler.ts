import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ActivityType } from '../domain/model/activity-type';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { SportsCenterResource } from './sports-center.resource';
import { SportsCentersResponse } from './sports-centers.response';


export class SportsCenterAssembler implements BaseAssembler<SportsCenter, SportsCenterResource> {
  toEntityFromResource(resource: SportsCenterResource): SportsCenter {
    return new SportsCenter(
      resource.id,
      resource.name,
      resource.activityType as ActivityType,
      resource.capacity,
      resource.latitude,
      resource.longitude,
    );
  }

  toEntitiesFromResponse(response: SportsCentersResponse): SportsCenter[] {
    return response.map((resource) => this.toEntityFromResource(resource));
  }
}
