import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {TrafficTypes} from "../models/trafficTypes";
import {Constants} from "../constants";

@Injectable()
export class TrafficTypesService extends DiyServerService {
	constructor(private _http: Http) { }

    /**
     * Function used to call the webservice that fetches
     * the traffic types.
     * @returns {Observable<R>}
     */
    getTrafficTypes() {
        return this._http.get(Constants.BASE_SERVER_URL + 'LookupItems?lookupName=Traffic_Type')
            .map((response: Response) => <TrafficTypes>response.json().data)
			.catch(this.handleResponseError);
    }
}
