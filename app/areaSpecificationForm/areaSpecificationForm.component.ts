import {Component} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';
import {Country} from '../models/country';
import {Category} from '../models/category';
import {MobileSettings} from '../models/mobile.settings';

import {CountryService} from '../services/country.service';
import {CategoryService} from '../services/category.service';
import {SelectedCategoryList} from 'app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component';
import {MobileSettingsService} from '../services/mobile.settings.service';
import {SelectedCategory} from "app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component";
import {ActivityTypeService} from '../services/activityType.service';
import {TrafficTypesService} from '../services/trafficTypes.service';
import {Observable} from "rxjs/Rx";
import {ActivityType} from "../models/activityType";
import {SelectedActivityTypes} from "../models/selectedActivityTypes";
import {TrafficTypes} from "../models/trafficTypes";
import {CategoryFilterPipe} from "../pipes/categoryFilter.pipe";

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css'],
    providers: [CountryService, CategoryService, SelectedCategoryList, MobileSettingsService,ActivityTypeService],
    directives: [SelectedCategory,SelectedCategoryList],
	pipes: [CategoryFilterPipe]
})
export class AreaSpecificationForm {
	countryList : Country[];
    categories :  Category [];
	trafficTypesOptions :  TrafficTypes [];
	selectedTrafficType;
	activityTypes: ActivityType[];
    selectedActivityTypes= [];

    formControlGroup;
	selectedCountryId;
   
	selectedCategories : Category [];
	mobileSettings : MobileSettings;
	
    proposalId : string;
    projectId : string;
	activityDescription : string;
	
	radius : number;
	radiusUnit : string; // "m" / "f"

	loiterTimeSelected : boolean;
	loiterTime : number;
	loiterTimeUnit : string; // "m" / "h"
	
	minSpeedSelected : boolean;
	minSpeed : number;
	minSpeedUnit : string; // "k" / "m"

	maxSpeedSelected : boolean;
	maxSpeed : number;
	maxSpeedUnit : string; // "k" / "m"

	currentlyAtLocation : boolean;

	expirationTimeSelected : boolean;
	expirationTime : number;
	expirationTimeUnit : string; // "m" / "h"
	mobileSettingsId : number;
	
	categoryFilterInput : string;
	constructor(private countryService: CountryService, private categoryService: CategoryService, private activityTypeService: ActivityTypeService, private selectedCategoryList: SelectedCategoryList, private mobileSettingsService: MobileSettingsService,
	private trafficTypesService: TrafficTypesService) {
		this.selectedCountryId = 0;  // United State
		this.countryList = [];
		this.selectedCategories = [];
		this.mobileSettings = new MobileSettings();
		
		this.mobileSettingsId = 0;
		
		this.proposalId = "67";
		this.projectId = "78";
		this.activityDescription = "";

		this.radius = 0;
		this.radiusUnit = "f";
		
		this.loiterTimeSelected = false;
		this.loiterTime = 0;
		this.loiterTimeUnit = "m";
		
		this.minSpeedSelected = false;
		this.minSpeed = 0;
		this.minSpeedUnit = "m";

		this.maxSpeedSelected = false;
		this.maxSpeed = 0;
		this.maxSpeedUnit = "m";

		this.currentlyAtLocation = false;

		this.expirationTimeSelected = false;
		this.expirationTime = 0;
		this.expirationTimeUnit = "m";
		
		this.categoryFilterInput = "";
    }

    ngOnInit(){
        this.formControlGroup = new ControlGroup({

        });

		this.countryService.getCountries()
			.subscribe(
				countryList => this.countryList = countryList,
				error => alert("Country list error: " + error)
				);
				
		this.categoryService.getCategories()
			.subscribe(
				categoryList => this.categories = categoryList,
				error => alert("Category list error: " + error)
				);

		this.trafficTypesService.getTrafficTypes()
			.subscribe(
				trafficTypesOptions => this.trafficTypesOptions = trafficTypesOptions,
				error => alert("Traffic Types options error: " + error)
			);

		this.activityTypeService.getActivityTypes()
			.subscribe(
				activityTypes => this.activityTypes = activityTypes,
				error => alert("Traffic Types options error: " + error)
			);

		this.mobileSettingsService.getMobileSettings()
			.subscribe(
				mobileSettings => this.handleMobileSettings(mobileSettings),
				error => alert("Traffic Types options error: " + error)
			);
    }

    private handleMobileSettings(mobileSettings: MobileSettings){
		this.selectedTrafficType = mobileSettings[0].traffic_type_id;
		for(var i = 0; i < mobileSettings[0].projectActivityTypes.length; i++){
			this.selectedActivityTypes[i] = mobileSettings[0].projectActivityTypes[i].activityTypeId;
	}
    }

private updateSelectedActivityType(selectedOption){
		if(selectedOption.currentTarget.checked)
			this.selectedActivityTypes.push(parseInt(selectedOption.currentTarget.value));
		else{
			var index = this.selectedActivityTypes.indexOf(parseInt(selectedOption.currentTarget.value));
			if (index > -1) {
				this.selectedActivityTypes.splice(index, 1);
			}
		}
    }

    onSubmit(areaSpecification){
		this.fillMobileSettingsComputedProperties();

		this.mobileSettingsService.createNewMobileSettings(this.mobileSettings)
			.subscribe(
				ms => { 
					alert("mobileSettingsService=" + JSON.stringify(ms)) 
					this.mobileSettingsId = ms.id;
				},
				error => alert("mobileSettingsService error: " + error)
				);
    }

	private fillMobileSettingsComputedProperties() {
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
		this.mobileSettings.id = 8;
        this.mobileSettings.traffic_type_id = this.selectedTrafficType;
		this.mobileSettings.activityTypes = "";
		for (var i = 0; i < this.selectedActivityTypes.length; i++){
			this.mobileSettings.activityTypes += this.selectedActivityTypes[i] + ",";
		}		
		this.mobileSettings.activityTypes = this.mobileSettings.activityTypes.substring(0, this.mobileSettings.activityTypes.length - 1);
	
	}

 /**
     * Function used to handle the category checkbox selection event.
     */
    onCategorySelect(category, e){
        //Check if the selection lead to selecting an item or deselecting it in order to add it to or remove it from the list of selectedCategories 
        if (e.target.checked){
			this.selectedCategories.push(category);
            console.log(this.selectedActivityTypes);
        }
        else{
            var index = this.selectedCategories.indexOf(category);
            if(index!=-1)
                this.selectedCategories.splice(index,1);
        }
        this.modifyDisplay("youSelectedLabel");
        var perCategoryRadioButtonStatus = document.getElementById("perCategory").checked;
        if(perCategoryRadioButtonStatus == true)
            this.modifyDisplay("quotasPerCategory");
    }

    onCategoryRemoved(category){
        document.getElementById(category.name).checked = false;
        this.modifyDisplay("youSelectedLabel");
    }

    /**
     * Function used to changes the visibility of some elements.
     * @param id
     */
    private modifyDisplay(id){
        if(this.selectedCategories.length > 0)
            this.display(id);
        else
            this.removeDisplay(id);
    }

    /**
     * Function used to remove the display of certain elements
     * @param id
     */
    private removeDisplay(id){
        var elementId = document.getElementById(id);
        elementId.style.display = "none";
    }

    /**
     * Function used to display certain elements
     * @param id
     */
    private display(id){
        var elementId = document.getElementById(id);
        elementId.style.display = "";
    }

	displayDaysAndTime(selectedOption){
		var selected = selectedOption.currentTarget.value;
		var elementId = document.getElementById("onlyDayAndTime");

		if(selected == "Only on these days/times")
			elementId.style.display = "";

		else
			elementId.style.display = "none";
	}

	updateSelectedTrafficType(selectedOption){
		this.selectedTrafficType = selectedOption.currentTarget.value;
	}

}