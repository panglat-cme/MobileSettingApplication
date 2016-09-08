import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {TrafficTypes} from "../models/trafficTypes";

@Injectable()
export class TrafficTypesService {
    constructor(private _http: Http) { }

    /**
     * Function used to call the webservice that fetches
     * the traffic types.
     * @returns {Observable<R>}
     */
    getTrafficTypes() {
        return this._http.get('http://172.17.1.45:8899/MobileSettings/LookupItems?lookupName=Traffic_Type')
            .map((response: Response) => <TrafficTypes>response.json().data)
            .catch(this.handleError);
    }

    /**
     * Function used to throw errors
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
