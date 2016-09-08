import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service'
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {TrafficTypes} from "../models/trafficTypes";

@Injectable()
export class TrafficTypesService {
	constructor(private _http: Http, private diyServerService : DiyServerService) { }

    /**
     * Function used to call the webservice that fetches
     * the traffic types.
     * @returns {Observable<R>}
     */
    getTrafficTypes() {
        return this._http.get(this.diyServerService.getBaseServerUrl() + 'LookupItems?lookupName=Traffic_Type')
            .map((response: Response) => <TrafficTypes>response.json().data)
			.catch(this.diyServerService.handleResponseError);
    }
}
