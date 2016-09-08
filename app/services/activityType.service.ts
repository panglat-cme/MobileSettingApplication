import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service'
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ActivityType} from "../models/activityType";

@Injectable()
export class ActivityTypeService {
	constructor(private _http: Http, private diyServerService : DiyServerService) { }

    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getActivityTypes() {
        return this._http.get(this.diyServerService.getBaseServerUrl() + 'LookupItems?lookupName=Activity_Type')
            .map((response: Response) => <ActivityType>response.json().data)
			.catch(this.diyServerService.handleResponseError);
    }
}

