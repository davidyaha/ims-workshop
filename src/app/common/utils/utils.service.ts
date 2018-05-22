import { Injectable } from '@angular/core';
import { ActionType, AcNotification, AcEntity } from 'angular-cesium';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  toNotificationsIterator(entity: AcEntity, id: number): AcNotification {
    return {
      id: String(id),
      entity,
      actionType: ActionType.ADD_UPDATE,
    };
  }
}
