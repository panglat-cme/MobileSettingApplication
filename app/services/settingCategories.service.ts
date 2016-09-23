import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Constants} from "../constants";

@Injectable()
export class SettingCategoriesService extends DiyServerService {
    constructor(private _http: Http) { }

    /**
     * Function used to build the url to the webservice
     * @param objCount, projectSettingId, categoryIds, quotas, keywords, nears
     * @returns {string}
     */
    private categorySettingsToURLParam(objCount : number, projectSettingId: String, categoryIds: String[], quotas: String[], keywords: String[], nears: String[]){
        let searchParams = new URLSearchParams();
        searchParams.set("objCount", objCount.toString());
        for(var i=0;i<objCount;i++){
            var index = i + 1;
            searchParams.set("projectSettingId"+ index, projectSettingId);
            searchParams.set("categoryId"+ index, categoryIds[i]);
            searchParams.set("quota"+ index, quotas[i]);
            searchParams.set("keyWord"+ index, keywords[i]);
            searchParams.set("near"+ index, nears[i]);
        }
        return searchParams.toString();
    }
    /**
     * Function used to save the mobile settings
     * @param objCount, projectSettingId, categoryIds, quotas, keywords, nears
     * @returns {Observable<R>}
     */
    saveSettingCategories(objCount : number, projectSettingId: String, categoryIds: String[], quotas: String[], keywords: String[], nears: String[]) {
        let body = this.categorySettingsToURLParam(objCount,projectSettingId,categoryIds,quotas,keywords,nears);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(Constants.BASE_SERVER_URL + Constants.SETTING_CATEGORIES, body, options)
            .map((response: Response) => { })
            .catch(this.handleResponseError);

    }
}
