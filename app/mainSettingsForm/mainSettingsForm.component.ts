import {Component} from 'angular2/core';
import {Constants} from "../constants";
import {MobileSettingsService} from '../services/mobileSettings.service';
import {ActivityTypeService} from '../services/activityType.service';
import {MobileSettings} from "../models/mobile.settings";
import {ActivityType} from "../models/activityType";
import {ControlGroup} from "angular2/common";

@Component({
    selector: 'mainSettingsForm',
    templateUrl: 'app/mainSettingsForm/mainSettingsForm.component.html',
    styleUrls: ['app/mainSettingsForm/mainSettingsForm.component.css'],
    providers: [MobileSettingsService, ActivityTypeService]
})
export class MainSettingsForm {
    mobileSettings = new MobileSettings();
    originalMobileSettings = new MobileSettings();

    activityTypes:ActivityType[];
    selectedActivityTypes = [];

    activityDescription = "";

    mobileSettingsId = 0;

    formControlGroup;

    showLoadingModalCount = 0;
    
    constructor(private mobileSettingsService: MobileSettingsService, private activityTypeService: ActivityTypeService){}

    ngOnInit() {
        this.formControlGroup = new ControlGroup({});

        //Get the list of activity types
        this.showLoadingModal();
        this.activityTypeService.getActivityTypes()
            .subscribe(
                activityTypes => {
                    this.activityTypes = activityTypes;
                    this.hideLoadingModal();
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_LIST + "Activity Types.");
                    this.hideLoadingModal();
                }
            );
        
        //Get all the mobile setting information
        this.showLoadingModal();
        this.mobileSettingsService.getMobileSettings(11)
            .subscribe(
                mobileSettings => {
                    this.handleMobileSettings(mobileSettings);
                    this.hideLoadingModal();
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_MOBILE_SETTINGS);
                    this.hideLoadingModal();
                }
            );
    }

    /**
     * Function used to save the mobile settings data.
     */
    onSubmit(){
        this.constructMobileSettingsObject();

        this.showLoadingModal();
        this.mobileSettingsService.createNewMobileSettings(this.mobileSettings)
            .subscribe(
                ms => {
                    this.mobileSettingsId = ms.id;
                },
                error => {
                    alert("mobileSettingsService error: " + error);
                    this.hideLoadingModal();
                }
            );
    }

    /**
     * Function used to build the mobile settings object with the correct data
     * in order to save it.
     */
    private constructMobileSettingsObject(){
        this.mobileSettings.id = 11;
        this.mobileSettings.activityDescription = this.activityDescription;

        this.mobileSettings.activityTypes = "";
        for (var i = 0; i < this.selectedActivityTypes.length; i++) {
            this.mobileSettings.activityTypes += this.selectedActivityTypes[i] + ",";
        }
        this.mobileSettings.activityTypes = this.mobileSettings.activityTypes.substring(0, this.mobileSettings.activityTypes.length - 1);
    }

    /**
     * Function used to save the mobile settings in variables
     * after calling the mobile settings webservice.
     * @param mobileSettings
     */
    private handleMobileSettings(mobileSettings:MobileSettings) {
        this.originalMobileSettings = mobileSettings[0];
        for(var i = 0; i < mobileSettings[0].projectActivityTypes.length; i++){
            this.selectedActivityTypes[i] = mobileSettings[0].projectActivityTypes[i].activityTypeId;
        }

        this.activityDescription = mobileSettings[0].activity_description;
    }

    /**
     * Function used to update the activity types object
     * when the the activity types checkboxes are modified
     * @param selectedOption
     */
    private updateSelectedActivityType(selectedOption) {
        if (selectedOption.currentTarget.checked)
            this.selectedActivityTypes.push(parseInt(selectedOption.currentTarget.value));
        else {
            var index = this.selectedActivityTypes.indexOf(parseInt(selectedOption.currentTarget.value));
            if (index > -1) {
                this.selectedActivityTypes.splice(index, 1);
            }
        }
    }

    /**
     * Function used to show the loader
     */
    private showLoadingModal() {
        this.showLoadingModalCount++;

        if(this.showLoadingModalCount == 1) {
            $('#loadingModal').modal('show');
        }
    }

    /**
     * Function used to hide the loader
     */
    private hideLoadingModal() {
        this.showLoadingModalCount--;
        if(this.showLoadingModalCount == 0) {
            $('#loadingModal').modal('hide');
        }
    }
}