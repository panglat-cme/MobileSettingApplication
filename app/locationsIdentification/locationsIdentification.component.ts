import {Component, Input, EventEmitter, Output} from "angular2/core";
import {Constants} from "../constants";
import {Category} from "../models/category";
import {CategoryFilterPipe} from "../pipes/categoryFilter.pipe";
import {SelectedCategoryList} from "app/locationsIdentification/SelectedCategoryList/SelectedCategoryList.component";
import {CategoryService} from '../services/category.service';
import {CountryService} from '../services/country.service';
import {Country} from "../models/country";
import {ProviderService} from '../services/provider.service';
import {Provider} from "../models/providers";

@Component({
    selector: 'locationsIdentification',
    templateUrl: 'app/locationsIdentification/locationsIdentification.component.html',
    styleUrls: ['app/locationsIdentification/locationsIdentification.component.css'],
    providers: [CategoryService,CountryService,ProviderService],
    directives: [SelectedCategoryList],
    pipes: [CategoryFilterPipe]
})

export class LocationsIdentification {
    @Input("settingsDetails") mobileSettings;
    @Output('selectedListUpdated') updatedSelectedList = new EventEmitter();
    categoryFilterInput = "";

    categories:Category [];
    selectedCategories = new Array<Category>();

    selectedCountryId;
    countryList:Country[];

    showLoadingModalCount =0;

    providers = [];
    selectedProviders = new Array<Provider>();

    constructor(private categoryService: CategoryService, private countryService: CountryService, private  providerService: ProviderService){}
    
    ngOnInit (){
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
                    //

                    this.hideLoadingModal();
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_LIST + "Providers.");
                    this.hideLoadingModal();
                }
            );

        this.selectedCountryId = this.mobileSettings.country_id;
    }

    /**
     * Function used to handle the category checkbox selection event.
     * @param category
     */
    private onCategorySelect(category) {
        var index = this.selectedCategories.indexOf(category);
        if (index != -1)
            this.selectedCategories.splice(index, 1);
        else{
            this.selectedCategories.push(category);
        }

        this.updatedSelectedList.emit(this.selectedCategories);
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
            this.categoryService.getCategories(this.selectedProviders)
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
        } else {
            this.categories = new Array<Category>();
        }
        // Check that only selected provider categories appears in the selected categories
        this.selectedCategories = this.selectedCategories.filter(category => this.selectedProviders.find(provider => provider.id === category.providerId) !== undefined);
    }

}