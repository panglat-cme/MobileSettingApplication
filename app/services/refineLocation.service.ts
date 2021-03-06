import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Constants} from "../constants";

@Injectable()
export class RefineLocationService extends DiyServerService {
    constructor(private _http: Http) { }

    /**
     * Function used to call the webservice that fetches
     * the traffic types.
     * @returns {Observable<R>}
     */
    getRefineLocations() {
        return this._http.get(Constants.BASE_SERVER_URL + Constants.SETTING_CATEGORIES + '?projectSettingId=19')
            .map((response: Response) => response.json().data)
            .catch(this.handleResponseError);
    }
}