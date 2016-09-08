import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ActivityType} from "../models/activityType";
import {SelectedActivityTypes} from "../models/selectedActivityTypes";

@Injectable()
export class ActivityTypeService {
    constructor(private _http: Http) { }

    getActivityTypes() {
        return this._http.get('http://172.17.1.45:8899/MobileSettings/LookupItems?lookupName=Activity_Type')
            .map((response: Response) => <ActivityType>response.json().data)
            .catch(this.handleError);
    }

    getSelectedActivityTypes() {
        return this._http.get('http://172.17.1.45:8899/MobileSettings/MobileSetting?id=41')
            .map((response: Response) => <SelectedActivityTypes>response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    

}

