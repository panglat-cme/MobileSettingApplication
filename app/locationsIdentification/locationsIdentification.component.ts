import {Component, Input, EventEmitter, Output} from "angular2/core";
import {Constants} from "../constants";
import {Category} from "../models/category";
import {CategoryFilterPipe} from "../pipes/categoryFilter.pipe";
import {SelectedCategoryList} from "app/locationsIdentification/SelectedCategoryList/SelectedCategoryList.component";
import {CategoryService} from '../services/category.service';
import {CountryService} from '../services/country.service';
import {RefineLocationService} from "../services/refineLocation.service";
import {Country} from "../models/country";
import {ProviderService} from '../services/provider.service';
import {Provider} from "../models/providers";

@Component({
    selector: 'locationsIdentification',
    templateUrl: 'app/locationsIdentification/locationsIdentification.component.html',
    styleUrls: ['app/locationsIdentification/locationsIdentification.component.css'],
    providers: [CategoryService,CountryService,ProviderService,RefineLocationService],
    directives: [SelectedCategoryList],
    pipes: [CategoryFilterPipe]
})

export class LocationsIdentification {
    @Input("settingsDetails") mobileSettings;
    @Output('selectedListUpdated') updatedSelectedList = new EventEmitter();
    @Output('refineDetailsUpdated') updateRefineDetails = new EventEmitter();
    categoryFilterInput = "";

    categories:Category [];
    selectedCategories = new Array<Category>();
    selectedCategoryIds = [];
    pickedCategoryId;
    zipcodeText;
    keywordText;
    refineDetails = [];

    selectedCountryId;
    countryList:Country[];

    showLoadingModalCount =0;

    providers = [];
    selectedProviders = new Array<Provider>();

    constructor(private categoryService: CategoryService, private countryService: CountryService, private  providerService: ProviderService, private refineLocationService: RefineLocationService){}
    
    ngOnInit (){

        //Get the countries LOV
        this.showLoadingModal();
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

        //Fetching the providers 
        this.showLoadingModal();
        this.providerService.getProviders()
            .subscribe(
                providers => {
                    this.providers = providers;
                    this.selectedProviders = new Array<Provider>();

                    // Auto select Foursquare provider
                    if(providers) {
                        let foursquareProvider = providers.filter(provider => provider.name.toLocaleLowerCase().indexOf('foursquare') != -1);
                        if(foursquareProvider && foursquareProvider.length >= 1) {
                            this.onProviderSelect(foursquareProvider[0]);
                        }
                    }
                    this.hideLoadingModal();
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_LIST + "Providers.");
                    this.hideLoadingModal();
                }
            );
        this.selectedCountryId = this.mobileSettings.country_id;
    }
	
	private getCategories(providers)
	{
		//Get all the categories
        this.showLoadingModal();
        this.categoryService.getCategories(providers)
            .subscribe(
                categoryList => {
                    this.categories = categoryList
                    this.refineLocationService.getRefineLocations()
                        .subscribe(
                            refineDetails => {
                                this.refineDetails = refineDetails;
                                this.retrieveSelectedCategories();
                                this.hideLoadingModal();
                            },
                            error => {
                                alert(Constants.ERROR_RETRIEVING_LIST + "Selected categories.");
                                this.hideLoadingModal();
                            }
                        );
                    this.hideLoadingModal();
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_LIST + "Categories.")
                    this.hideLoadingModal();
                }
            );

	}

    /**
     * Function used to handle the category checkbox selection event.
     * @param category
     */
    private onCategorySelect(category) {
        var idIndex = this.selectedCategoryIds.indexOf(category.id);

        if (idIndex != -1){
            this.selectedCategoryIds.splice(idIndex, 1);
            for(var i=0;i<this.selectedCategories.length;i++){
                if(this.selectedCategories[i].id == category.id) {
                    this.selectedCategories.splice(i, 1);
                    break;
                }
            }
            this.deleteRefineDetailsEntry(category.id);
         }
        else{
            this.selectedCategories.push(category);
            this.selectedCategoryIds.push(category.id);
            this.addNewRefineDetailsEntry(category.id);
        }

        this.updatedSelectedList.emit(this.selectedCategories);
        this.updateRefineDetails.emit(this.refineDetails);
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
     * Function used to handle the provider checkbox selection event.
     */
    onProviderSelect(provider){
        var index = this.selectedProviders.indexOf(provider);
        if (index != -1)
            this.selectedProviders.splice(index, 1);
        else{
            this.selectedProviders.push(provider);
        }

        if(this.selectedProviders.length > 0) {
            //Get all the categories
            this.showLoadingModal();
			this.getCategories(this.selectedProviders);
        } else {
            this.categories = new Array<Category>();
        }
        // Check that only selected provider categories appears in the selected categories
        this.selectedCategories = this.selectedCategories.filter(category => this.selectedProviders.find(provider => provider.id === category.providerId) !== undefined);
    }

    /**
     * Function used to fill the selectedCategories array based on the refineDetails array
     */
    private retrieveSelectedCategories(){
        for(var i=0;i<this.refineDetails.length;i++){
            var id = this.refineDetails[i].categoryId;
            var category = this.categories.filter(function(cat){
                  return cat.id == id;
            })[0];
            this.selectedCategories.push(category);
            this.selectedCategoryIds.push(id);
        }
        if(this.selectedCategoryIds.length!=0)
            this.pickedCategoryId = this.selectedCategoryIds[0];

        this.changeTextFields(this.pickedCategoryId);
        this.updatedSelectedList.emit(this.selectedCategories);
        this.updateRefineDetails.emit(this.refineDetails);
    }
    /**
     * Function used to detect when selected category in drop down is changed
     */
    selectedCategoryInDropdownChanged(category){
      this.changeTextFields(category.currentTarget.value);
    }

    changeTextFields(categoryId){
        if(categoryId !=null) {
       var details = this.refineDetails.filter(function(rd){
                return rd.categoryId == categoryId;
            })[0];
        this.keywordText = details.keywords;
        this.zipcodeText= details.zipCodes;
        }
        else{
            this.keywordText = "";
            this.zipcodeText = "";
        }
    }

    addNewRefineDetailsEntry(categoryId){
        var refineDetails = {
            categoryId: categoryId,
            quota: undefined,
            zipCodes: "",
            keywords: ""};
        this.refineDetails.push(refineDetails);
    }
    deleteRefineDetailsEntry(categoryId){
        for(var i=0;i<this.refineDetails.length;i++){
            if(this.refineDetails[i].categoryId == categoryId) {
                if(this.pickedCategoryId == categoryId) {
                    if(this.selectedCategoryIds.length!=0)
                        this.pickedCategoryId = this.selectedCategoryIds[0];
                    else
                        this.pickedCategoryId = null;
                    this.changeTextFields(this.pickedCategoryId);
                }

                this.refineDetails.splice(i, 1);
                return;
            }
        }
    }
    updateRefineDetailsEntry(){
        for(var i=0;i<this.refineDetails.length;i++){
            if(this.refineDetails[i].categoryId == this.pickedCategoryId) {
                this.refineDetails[i].zipCodes = this.zipcodeText;
                this.refineDetails[i].keywords = this.keywordText;
                this.updateRefineDetails.emit(this.refineDetails);
                return;
            }
        }
    }
    private onCountryChange(country){
        this.mobileSettings.country_id = country.currentTarget.value;
    }
}