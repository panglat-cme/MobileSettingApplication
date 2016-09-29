import {Component, Input, EventEmitter, Output, ViewChild} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';
import {Country} from '../models/country';
import {Category} from '../models/category';
import {MobileSettings} from '../models/mobile.settings';
import {CountryService} from '../services/country.service';
import {CategoryService} from '../services/category.service';

import {MobileSettingsService} from '../services/mobileSettings.service';

import {GeofencingModel} from "app/geofencingModel/geofencingModel.component";
import {LocationsIdentification} from "app/locationsIdentification/locationsIdentification.component";
import {GeofenceTriggerOptions} from "app/geofenceTriggerOptions/geofenceTriggerOptions.component";
import {QuotaManagement} from 'app/quotaManagement/quotaManagement.component';
import {LookupItemsService} from '../services/lookupItems.service';
import {SettingCategoriesService} from '../services/settingCategories.service';
import {ActivityType} from "../models/activityType";
import {TrafficTypes} from "../models/trafficTypes";
import {QuotaType} from "../models/quotaType";
import {CategoryFilterPipe} from "../pipes/categoryFilter.pipe";
import {RefineLocationService} from '../services/refineLocation.service'
import {Constants} from 'app/constants';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css'],
    providers: [CountryService, CategoryService, MobileSettingsService, LookupItemsService, RefineLocationService,SettingCategoriesService],
    directives: [GeofencingModel, LocationsIdentification, QuotaManagement, GeofenceTriggerOptions],
	pipes: [CategoryFilterPipe]
})

export class AreaSpecificationForm {
	@Input('selectedTab') selectedTab;
	@Input('originalSettings') settingsDetails;
	@Output('tabChanged') changeTab = new EventEmitter();
	@ViewChild(GeofenceTriggerOptions) geofenceTriggerOptions: GeofenceTriggerOptions;
	countryList:Country[];
	categories:Category [];

	trafficTypesOptions:TrafficTypes [];
	selectedTrafficType;

	activityTypes:ActivityType[];
	selectedActivityTypes = [];

	formControlGroup;

	selectedCategories = new Array<Category>();
	refineDetails = [];
	mobileSettings = new MobileSettings();

	mobileSettingsId = 19;

	activityDescription = "";

	refineLocation =[];

	quotaTypes:QuotaType[];
	quotaTypeId = 0;
	quotaTypePerCategory = false;

	radius = 441;
	radiusUnit = "f"; // "m" / "f"

	loiterTimeSelected = false;
	loiterTime = 11;
	loiterTimeUnit = "m"; // "m" / "h"

	minSpeedSelected = false;
	minSpeed = 21;
	minSpeedUnit = "m"; // "k" / "m"

	maxSpeedSelected = false;
	maxSpeed = 110;
	maxSpeedUnit = "m";  // "k" / "m"

	currentlyAtLocation = -1;

	expirationTimeSelected = false;
	expirationTime = 14;
	expirationTimeUnit = "m"; // "m" / "h"

	countryId = 1; // United State

	categoryFilterInput = "";
	
	showLoadingModalCount = 0;

	triggerScheduleSelectedValue ="";

	constructor(private countryService:CountryService, private categoryService:CategoryService, private lookupItemsService:LookupItemsService, private mobileSettingsService:MobileSettingsService,
				  private refineLocationService: RefineLocationService, private settingCategoriesService: SettingCategoriesService) {
	}

	ngOnInit() {
		this.triggerScheduleSelectedValue = "anyDayTime" ;
		this.formControlGroup = new ControlGroup({});
		this.openTab("tab0");
		//Disable the effect of clicks and keyboard keys from hiding the dialog
		$('#loadingModal').modal({backdrop: 'static', keyboard: false});
		//Get the countries LOV
		/*this.showLoadingModal();
		this.countryService.getCountries()
			.subscribe(
				countryList => {
					this.countryList = countryList;
					this.hideLoadingModal();
				},
				error => {
					alert(Constants.ERROR_RETRIEVING_LIST + "Countries.");
					this.hideLoadingModal();
				}
			);

		//Get all the categories
		this.showLoadingModal();
		this.categoryService.getCategories()
			.subscribe(
				categoryList => {
					this.categories = categoryList
					this.hideLoadingModal();
				},
				error => { 
					alert(Constants.ERROR_RETRIEVING_LIST + "Categories.")
					this.hideLoadingModal();
				}
			);

		//Get the list of activity types
		this.showLoadingModal();
		this.lookupItemsService.getActivityTypes()
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

		//Get the list of traffic types
		this.showLoadingModal();
		this.lookupItemsService.getTrafficTypes()
			.subscribe(
				trafficTypesOptions => {
					this.trafficTypesOptions = trafficTypesOptions;
					this.hideLoadingModal();
				},
				error => {
					alert(Constants.ERROR_RETRIEVING_LIST + "Traffic Types.");
					this.hideLoadingModal();
				}
			);

		//Get the list of quota types
		this.showLoadingModal();
		this.lookupItemsService.getQuotasTypes()
			.subscribe(
				quotaTypes => {
					this.quotaTypes = quotaTypes;
					this.hideLoadingModal();					
				},
				error => {
					alert(Constants.ERROR_RETRIEVING_LIST + "Quota Types.");
					this.hideLoadingModal();
				}
			);

		//Get all the refine locations
		this.showLoadingModal();
		this.refineLocationService.getRefineLocations()
			.subscribe(
				refineLocation => {
					this.refineLocation = refineLocation;
					this.hideLoadingModal();
				},
				error => {
					alert("Refine Locations error: " + error);
					this.hideLoadingModal();
				}
			);
		//Get all the mobile setting information
		this.showLoadingModal();
		this.mobileSettingsService.getMobileSettings(1)
			.subscribe(
				mobileSettings => {
					this.handleMobileSettings(mobileSettings);
					this.hideLoadingModal();
				},
				error => {
					alert(Constants.ERROR_RETRIEVING_MOBILE_SETTINGS);
					this.hideLoadingModal();
				}
			);*/
		}

	/**
	 * Function used to call the updateMobileSettings()
	 * from the geofenceTriggeroptions class
	 */
	public callMobileSettingsUpdate(){
		this.geofenceTriggerOptions.updateMobileSettings();
	}

	private showLoadingModal() {
		this.showLoadingModalCount++;
		console.log("showLoadingModal showLoadingModalCount=" + this.showLoadingModalCount);
		if(this.showLoadingModalCount == 1) {
			$('#loadingModal').modal('show');
		}
	}
	
	private hideLoadingModal() {
		this.showLoadingModalCount--;
		console.log("showLoadingModal showLoadingModalCount=" + this.showLoadingModalCount);
		if(this.showLoadingModalCount == 0) {
			$('#loadingModal').modal('hide');
		}
	}
	
	/**
	 * Function used to save the mobile settings in variables
	 * after calling the mobile settings webservice.
	 * @param mobileSettings
	 */
	private handleMobileSettings(mobileSettings:MobileSettings) {
		let mobileSetting = mobileSettings[0];
		this.selectedTrafficType = mobileSetting.traffic_type_id;
		for(var i = 0; i < mobileSetting.projectActivityTypes.length; i++){
			this.selectedActivityTypes[i] = mobileSetting.projectActivityTypes[i].activityTypeId;
		}

		this.activityDescription = mobileSetting.activity_description;

		this.quotaTypeId = mobileSetting.quota_type_id;
		for(var i = 0; i < this.quotaTypes.length; i++){
			if(this.quotaTypes[i].name == Constants.PER_CATEGORY_NAME && this.quotaTypeId == this.quotaTypes[i].id)
				this.quotaTypePerCategory = true;
		}
	}

	/**
	 * Function used to save the mobile settings data
	 * @param areaSpecification
	 */
	onSubmit(areaSpecification) {
		this.constructMobileSettingsObject();

		this.showLoadingModal();
		this.mobileSettingsService.createNewMobileSettings(this.mobileSettings)
			.subscribe(
				ms => {
					this.mobileSettingsId = ms.id;
					this.saveSettingCategories();
				},
				error => {
					alert("mobileSettingsService error: " + error);
					this.hideLoadingModal();
				}
			);

	}
	/**
	 * Function to test the category saving service
	 */
	private saveSettingCategories(){
		var categoryIds = ["1","2"];
		var quotas= ["21","22"];
		var keywords=["edduy,jad","asdu,asdasd,asd"];
		var nears = ["234,23423","2344"];

        this.settingCategoriesService.saveSettingCategories(2,"6",categoryIds,quotas,keywords,nears)
			.subscribe(
				success => {
					this.hideLoadingModal();
				},
				error => {
					alert("error "+  error);
					this.hideLoadingModal();
				}
			);
	}
	/**
	 * Function used to construct the mobile settings object
	 * based on the values in the UI
	 */
	private constructMobileSettingsObject() {
		/*if(this.mobileSettingsId != 0) {
		 this.mobileSettings.id = this.mobileSettingsId;
		 }
		 this.mobileSettings.activityDescription = this.activityDescription;
		 this.mobileSettings.proposalId =  this.proposalId;
		 this.mobileSettings.projectId = this.projectId;
		 this.mobileSettings.currentlyAtLocation = this.currentlyAtLocation;
		 this.mobileSettings.activityTypes = "2,3,5";

		 if(this.radiusUnit == "m") {
		 this.mobileSettings.radius = this.radius;
		 } else {
		 this.mobileSettings.radius = this.radius * 0.3048;
		 }
		 this.mobileSettings.radius = Math.round(this.mobileSettings.radius);

		 if(this.loiterTimeSelected) {
		 if(this.loiterTimeUnit == "h") {
		 this.mobileSettings.loiterTime = this.loiterTime * 60;
		 } else {
		 this.mobileSettings.loiterTime = this.loiterTime;
		 }
		 this.mobileSettings.loiterTime = Math.round(this.mobileSettings.loiterTime);
		 } else {
		 this.mobileSettings.loiterTime = 0;
		 }

		 if(this.minSpeedSelected) {
		 if(this.minSpeedUnit == "m") {
		 this.mobileSettings.minSpeed = this.minSpeed * 1.60934;
		 } else {
		 this.mobileSettings.minSpeed = this.minSpeed;
		 }
		 this.mobileSettings.minSpeed = Math.round(this.mobileSettings.minSpeed);
		 } else {
		 this.mobileSettings.minSpeed = 0;
		 }

		 if(this.maxSpeedSelected) {
		 if(this.maxSpeedUnit == "m") {
		 this.mobileSettings.maxSpeed = this.maxSpeed * 1.60934;
		 } else {
		 this.mobileSettings.maxSpeed = this.maxSpeed;
		 }
		 this.mobileSettings.maxSpeed = Math.round(this.mobileSettings.minSpeed);
		 } else {
		 this.mobileSettings.maxSpeed = 0;
		 }

		 if(this.expirationTimeSelected) {
		 if(this.expirationTimeUnit == "h") {
		 this.mobileSettings.expirationTime = this.expirationTime * 60;
		 } else {
		 this.mobileSettings.expirationTime = this.expirationTime;
		 }
		 this.mobileSettings.expirationTime = Math.round(this.mobileSettings.expirationTime);
		 } else {
		 this.mobileSettings.expirationTime = 0;
		 }*/
		this.mobileSettings.id = 1;
		this.mobileSettings.projectId = this.projectId;
		this.mobileSettings.proposalId = this.proposalId;

		this.mobileSettings.activityDescription = this.activityDescription;

		this.mobileSettings.radius = this.radius;

		this.mobileSettings.loiterTime = this.loiterTime;

		this.mobileSettings.minSpeed = this.minSpeed;
		this.mobileSettings.maxSpeed = this.maxSpeed;

		this.mobileSettings.expirationTime = this.expirationTime;

		this.mobileSettings.currentlyAtLocation = this.currentlyAtLocation;

		this.mobileSettings.countryId = this.countryId;

		this.mobileSettings.traffic_type_id = this.selectedTrafficType;

		this.mobileSettings.activityTypes = "";
		for (var i = 0; i < this.selectedActivityTypes.length; i++) {
			this.mobileSettings.activityTypes += this.selectedActivityTypes[i] + ",";
		}
		this.mobileSettings.activityTypes = this.mobileSettings.activityTypes.substring(0, this.mobileSettings.activityTypes.length - 1);

		this.mobileSettings.quotaTypeId = this.quotaTypeId;
	}

	/**
	 * Function used to handle the category checkbox selection event.
	 */
	onCategorySelect(category){
		var index = this.selectedCategories.indexOf(category);
        if (index != -1)
            this.selectedCategories.splice(index, 1);
        else{
            this.selectedCategories.push(category);
        }
	}


	/**
	 * Fuction used to update the quota type id
	 * based on the radio buttons selection
	 * @param quotaType
     */
	private quotaTypeChanged(quotaType){
		this.quotaTypeId = quotaType.id;
		if(quotaType.name == Constants.PER_CATEGORY_NAME)
			this.quotaTypePerCategory = true;
		else
			this.quotaTypePerCategory = false;
	}

	/**
	 * Function used to remove the display of certain elements
	 * @param id
	 */
	private removeDisplay(id) {
		var elementId = document.getElementById(id);
		elementId.style.display = "none";
	}

	/**
	 * Function used to display certain elements
	 * @param id
	 */
	private display(id) {
		var elementId = document.getElementById(id);
		elementId.style.display = "";
	}

	/**
	 * Function used to display the list of days and time when
	 * 'Only on these days/times' is selected
	 * @param selectedOption
	 */
	displayDaysAndTime(selectedOption) {
		var selected = selectedOption.currentTarget.value;
		var elementId = document.getElementById("onlyDayAndTime");

		if (selected == "Only on these days/times")
			elementId.style.display = "";

		else
			elementId.style.display = "none";
	}

	/**
	 * Function used to update the traffic types object
	 * when traffic type is modified
	 * @param selectedOption
	 */
	updateSelectedTrafficType(selectedOption) {
		this.selectedTrafficType = selectedOption.currentTarget.value;
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

	openTab(tabName){
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
			if(tablinks[i].id == tabName+"Link")
				tablinks[i].className += " active";
		}

		//Show the current tab, and add an "active" class to the link that opened the tab
		document.getElementById(tabName).style.display = "block";
		this.changeTab.emit(tabName);
	}

	updateSelectedCategories(selectedCategories){
		this.selectedCategories = selectedCategories;
	}
	updateRefineDetails(refineDetails){
		this.refineDetails = refineDetails;
	}
	saveRefineDetails(){
		this.showLoadingModal();
		this.settingCategoriesService.saveSettingCategories(this.mobileSettingsId,this.refineDetails)
			.subscribe(
				activityTypes => {
					this.hideLoadingModal();
				},
				error => {
					alert("Error Saving List");
					this.hideLoadingModal();
				}
			);
	}
}