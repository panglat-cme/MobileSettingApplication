import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {TrafficTypes} from "../models/trafficTypes";

@Injectable()
export class TrafficTypesService {
    constructor(private _http: Http) { }

    getTrafficTypes() {
        return this._http.get('http://172.17.1.45:8899/MobileSettings/LookupItems?lookupName=Traffic_Type')
            .map((response: Response) => <TrafficTypes>response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
