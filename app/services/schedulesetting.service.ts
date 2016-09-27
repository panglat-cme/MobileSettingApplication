import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ScheduleSetting} from "../models/scheduleSetting";
import {Constants} from "../constants";

@Injectable()
export class ScheduleSettingService extends DiyServerService {
	constructor(private _http: Http) { }

    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getScheduleSetting(projectSettingId) {
        return this._http.get(Constants.BASE_SERVER_URL + 'ScheduleSetting?projectSettingId=' + projectSettingId)
            .map((response: Response) => <ScheduleSetting>response.json().data)
			.catch(this.handleResponseError);
    }
}

