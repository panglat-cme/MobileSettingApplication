import {Component, Input} from "angular2/core";
import {Constants} from "../constants";
import {LookupItemsService} from "../services/lookupItems.service";
import {TrafficTypes} from "../models/trafficTypes";

@Component({
    selector: 'geofencingModel',
    templateUrl: 'app/geofencingModel/geofencingModel.component.html',
    styleUrls: ['app/geofencingModel/geofencingModel.component.css'],
    providers: [LookupItemsService]
})

export class GeofencingModel{
    @Input("settingsDetails") mobileSettings;
    showLoadingModalCount=0;

    trafficTypesOptions:TrafficTypes [];
    selectedTrafficType=0;
    trafficTypesCount = 0;
    
    constructor(private lookupItemsService: LookupItemsService){}
    
    ngOnInit(){
        //Get the list of traffic types
        this.showLoadingModal();
        this.lookupItemsService.getTrafficTypes()
            .subscribe(
                trafficTypesOptions => {
                    this.trafficTypesOptions = trafficTypesOptions;
                    this.hideLoadingModal();
                    this.trafficTypesCount = this.trafficTypesOptions.length;
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_LIST + "Traffic Types.");
                    this.hideLoadingModal();
                }
            );
            this.selectedTrafficType = this.mobileSettings.traffic_type_id;
    }

    /**
     * Function used to show the loader
     */
    private showLoadingModal() {
        this.showLoadingModalCount++;
        if(this.showLoadingModalCount == 1) {
            //noinspection TypeScriptUnresolvedFunction
            $('#loadingModal').modal('show');
        }
    }

    /**
     * Function used to hide the loader
     */
    private hideLoadingModal() {
        this.showLoadingModalCount--;
        if(this.showLoadingModalCount == 0) {
            //noinspection TypeScriptUnresolvedFunction
            $('#loadingModal').modal('hide');
        }
    }

    /**
     * Function used to update the traffic type selected value
     * @param event
     */
    updateSelectedTrafficType(event){
        this.selectedTrafficType = event.currentTarget.value;
    }
}




