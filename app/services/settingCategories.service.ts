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
    private categorySettingsToURLParam(projectSettingId, refineDetails){
        let searchParams = new URLSearchParams();
        searchParams.set("objCount", refineDetails.length.toString());
        for(var i=0;i<refineDetails.length;i++){
            var index = i + 1;
            searchParams.set("projectSettingId"+ index, projectSettingId);
            searchParams.set("categoryId"+ index, refineDetails[i].categoryId);
            if(refineDetails[i].quota != null && refineDetails[i].quota!="")
                searchParams.set("quota"+ index, refineDetails[i].quota);
            else
                searchParams.set("quota"+ index, 0);
            if(refineDetails[i].keywords != null && refineDetails[i].keywords!="")
                searchParams.set("keyWord"+ index, refineDetails[i].keywords);
            if(refineDetails[i].zipCodes != null && refineDetails[i].zipCodes !="")
                searchParams.set("near"+ index,  refineDetails[i].zipCodes);
            else
                searchParams.set("near"+ index, "");
        }
        return searchParams.toString();
    }
    /**
     * Function used to save the mobile settings
     * @param objCount, projectSettingId, categoryIds, quotas, keywords, nears
     * @returns {Observable<R>}
     */
    saveSettingCategories(projectSettingId, refineDetails) {
        let body = this.categorySettingsToURLParam(projectSettingId,refineDetails);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(Constants.BASE_SERVER_URL + Constants.SETTING_CATEGORIES, body, options)
            .map((response: Response) => { })
            .catch(this.handleResponseError);

    }
}
