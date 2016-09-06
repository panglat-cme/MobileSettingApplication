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
import {Observable} from "rxjs/Rx";
import {ActivityType} from "../models/activityType";
import {SelectedActivityTypes} from "../models/selectedActivityTypes";

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css'],
    providers: [CountryService, CategoryService, SelectedCategoryList, MobileSettingsService,ActivityTypeService],
    directives: [SelectedCategory,SelectedCategoryList]
})
export class AreaSpecificationForm {
	countryList : Country[];
    categories :  Category [];
 activityTypes: ActivityType[];
    selectedActivityTypes: SelectedActivityTypes;
    displayableActivityTypes = [];
    formControlGroup;
	selectedCountryId;
   
	selectedCategories : Category [];
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
	mobileSettingsId : number;
	
	constructor(private countryService: CountryService, private categoryService: CategoryService, private activityTypeService: ActivityTypeService, private selectedCategoryList: SelectedCategoryList, private mobileSettingsService: MobileSettingsService) {
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

        this.getAll();
    }

    onSubmit(areaSpecification){
        //console.log(areaSpecification);
    }

	private fillMobileSettingsComputedProperties() {
		if(this.mobileSettingsId != 0) {
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
		}		
	}
	
	save() {
		this.fillMobileSettingsComputedProperties();

		this.mobileSettingsService.createNewMobileSettings(this.mobileSettings)
			.subscribe(
				ms => { 
					//alert("mobileSettingsService=" + JSON.stringify(ms)) 
					alert("Data saved. Id=" + ms.id);
					this.mobileSettingsId = ms.id;
				},
				error => alert("mobileSettingsService error: " + error)
				);
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

    private getAll(){
        Observable.forkJoin(
            this.activityTypeService.getActivityTypes().map((returnedData: ActivityType) => returnedData),
            this.activityTypeService.getSelectedActivityTypes().map((returnedData: SelectedActivityTypes) => returnedData)
        ).subscribe(returnedData => this.fillData(returnedData));
    }

    private fillData(returnedData){
        this.activityTypes=returnedData[0];
        this.displayableActivityTypes = this.activityTypes;
        if(returnedData[1].length==1) {
            this.selectedActivityTypes = returnedData[1][0];
            for (var i = 0; i < this.activityTypes.length; i++) {
                var parentAreaSpecificationForm = this;
                var selected = this.selectedActivityTypes['projectActivityTypes'].filter(function (item) {
                    return (item['activityTypeId'] == parentAreaSpecificationForm.activityTypes[i].id);
                });

                if (selected.length != 0)
                    this.displayableActivityTypes[i]['selected'] = true;

                else
                    this.displayableActivityTypes[i]['selected'] = false;

            }
        }
    }

	displayDaysAndTime(selectedOption){
		var selected = selectedOption.currentTarget.value;
		var elementId = document.getElementById("onlyDayAndTime");

		if(selected == "Only on these days/times")
			elementId.style.display = "";

		else
			elementId.style.display = "none";
	}
}