import {Component} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';
import {Country} from '../models/country';
import {Category} from '../models/category';
import {MobileSettings} from '../models/mobile.settings';

import {CountryService} from '../services/country.service';
import {CategoryService} from '../services/category.service';
import {CommonService} from 'app/common.service';
import {SelectedCategoryList} from 'app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component';
import {MobileSettingsService} from '../services/mobile.settings.service';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css'],
	providers: [CountryService, CategoryService, CommonService, SelectedCategoryList, MobileSettingsService],
    directives: [SelectedCategoryList]
})
export class AreaSpecificationForm {
	countryList : Country[];
    formControlGroup;
	selectedCountryId;
    categories :  Category [];
	myCategoryList : Category [];
	mobileSettings : MobileSettings;
	
    proposalId : string;
    projectId : string;
	activityDescription : string;
	
	radius : number;
	radiusUnit : string; // "m" / "f"

	loitureTimeSelected : boolean;
	loiterTime : number;
	loiterTimeUnit : string; // "m" / "h"
	
	minSpeedSelected : boolean;
	minSpeed : number;
	minSpeedUnit : string; // "k" / "m"

	maxSpeedSelected : boolean;
	maxSpeed : number;
	maxSpeedUnit : string; // "k" / "m"

	currentlyAtLocation : boolean

	expirationTimeSelected : boolean;
	expirationTime : number;
	expirationTimeUnit : string; // "m" / "h"
	
	constructor(private countryService: CountryService, private categoryService: CategoryService
		private commonService: CommonService, private selectedCategoryList: SelectedCategoryList, private mobileSettingsService: MobileSettingsService) {
		this.selectedCountryId = 0;  // United State
		this.countryList = [];
		this.myCategoryList = [];
		this.mobileSettings = new MobileSettings();
		
		this.proposalId = "67";
		this.projectId = "78";
		this.activityDescription = "";

		this.radius = 0;
		this.radiusUnit = "f";
		
		this.loitureTimeSelected = false;
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
    }

    ngOnInit(){
        this.formControlGroup = new ControlGroup({
            'radius' : new Control(''),
            'latitude': new Control(''),
            'longitude' : new Control(''),
            'studyId' : new Control ('')
        });
        //this.categories = this.commonService.get();
		// TODO: commonService has to be deleted?
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
    }
    onSubmit(areaSpecification){
		alert("Submit");
        console.log(areaSpecification);
    }
	
	private fillMobileSettingsComputedProperties() {
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
		
		if(this.loitureTimeSelected) {
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
			this.mobileSettings.minSpeed = Math.round(this.mobileSettings.minSpeed);
		} else {
			this.mobileSettings.minSpeed = 0;
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
		}		
	}
	
	save() {
		this.fillMobileSettingsComputedProperties();

		this.mobileSettingsService.createNewMobileSettings(this.mobileSettings)
			.subscribe(
				ms => alert("mobileSettingsService=" + JSON.stringify(ms)),
				error => alert("mobileSettingsService error: " + error)
				);
	}

    /**
     * Function used to handle the category checkbox selection event.
     */
    onCategorySelect(category, e){
        if (e.target.checked){
			this.myCategoryList.push(category);
        }
    }

}