import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ActivityType} from "../models/activityType";
import {Constants} from "../constants";

@Injectable()
export class ActivityTypeService extends DiyServerService {
	constructor(private _http: Http) { }

    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getActivityTypes() {
        return this._http.get(Constants.BASE_SERVER_URL + 'LookupItems?lookupName=Activity_Type')
            .map((response: Response) => <ActivityType>response.json().data)
			.catch(this.handleResponseError);
    }
}

