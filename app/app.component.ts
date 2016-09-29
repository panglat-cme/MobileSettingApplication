import {Component, ViewChild, Input} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { DiyServerService } from './services/diyServer.service';
import {AreaSpecificationForm} from './areaSpecificationForm/areaSpecificationForm.component';
import {MainSettingsForm} from './mainSettingsForm/mainSettingsForm.component';
import {MobileSettingsService} from './services/mobileSettings.service';

@Component({
    selector : 'app',
    directives: [AreaSpecificationForm,MainSettingsForm],
    templateUrl : 'app/app.component.html',
    styleUrls : ['app/app.component.css'],
	providers : [HTTP_PROVIDERS, DiyServerService, MobileSettingsService]
})
export class AppComponent {
    settingsDetails;
    page="";
    proposalId = 2221;
    projectId = 21234;

    showLoadingModalCount = 0;

    constructor(private mobileSettingsService: MobileSettingsService){}

    @Input('selectedTab') tab;
    @ViewChild(AreaSpecificationForm) areaSpecificationForm: AreaSpecificationForm;
    @ViewChild(MainSettingsForm) mainSettingsForm: MainSettingsForm;

    ngOnInit(){
        //When the application starts open the main page containing the activity description and the activity types
        this.page="mainPage";
    }

    /**
     * Function used to handle the event of clicking the default button.
     * The default button is the one with title Next or Save Project
     */
    defaultButtonClicked(){
        //If the user is on the main page
        if(this.page == "mainPage") {
            this.page = "settingsDetails";
            this.tab = "tab0";
            this.mainSettingsForm.constructMobileSettingsObject();
            this.save();
        }
        //If the user is not on the main page, clicking the default button will move the user to another tab
        else {
            //Discover the index of the currently selected tab and increment it
            var tabIndex = this.tab.split("tab")[1];
            tabIndex++;
            if(tabIndex<=3) {
                this.tab = "tab" + tabIndex;
                //Open the tab with index resulting from the incrementation
                this.areaSpecificationForm.openTab(this.tab);
            }
            else {
                this.areaSpecificationForm.callMobileSettingsUpdate();
                this.save();
            }
        }
        //Call the changeButtonsTitle function to set the button's title based on the selected page or tab after navigation
        this.changeButtonsTitles();
    }
    /**
     * Function used to handle the event of clicking the secondary button.
     * The secondary button is the one with title Back or Cancel
     */
    secondaryButtonClicked(){
        //Discover the index of the currently selected tab and decrement it
        var tabIndex = this.tab.split("tab")[1];
        tabIndex--;
        //If the user is in the settings details page
        if(tabIndex>=0) {
            this.tab = "tab" + tabIndex;
            //Open the tab with index resulting from the decrementation
            this.areaSpecificationForm.openTab(this.tab);
        }
        //If the user is in the main page
        else
            this.page="mainPage";
        //Call the changeButtonsTitle function to set the button's title based on the selected page or tab after navigation
        this.changeButtonsTitles();
    }
    /**
     * Function used to the buttons' titles based on the tab or page the user is in
     */
    changeButtonsTitles(){
        //Retrieving the default button element
        var defaultButton = document.getElementById("defaultButton");
        var defaultButtonSpan = document.getElementById("defaultButtonSpan");
        //If user is on the last tab or on the main page then the button's title is Save Project
        if(this.tab=="tab3" || this.page=="mainPage") {
            defaultButtonSpan.textContent = "Save Project";
            defaultButton.classList.remove("hoverNextWithStyle");
        }

        //Otherwise the button title is Next
        else {
            defaultButtonSpan.textContent = "Next";
            defaultButton.className += " hoverNextWithStyle"

        }

        //Retrieving the secondary button element
        var secondaryButton = document.getElementById("secondaryButton");
        var secondaryButtonSpan = document.getElementById("secondaryButtonSpan");
        //If user is on the settings details page the title of the secondary button is Back
        if(this.page!="mainPage") {
            secondaryButtonSpan.textContent = "Back";
            secondaryButton.className += " hoverBackWithStyle"
        }
        //Otherwise the button title tis Cancel
        else {
            secondaryButtonSpan.textContent = "Cancel";
            secondaryButton.classList.remove("hoverBackWithStyle");
        }
    }
    /**
     * Function called when the user changes tab by clicking on it
     * @param tabName
     */
    updateSelectedPage(tabName){
        this.tab = tabName;
        this.changeButtonsTitles();
    }
    /**
     * Function used to update the mobile settings details and
     * pass it to other classes later on
     * @param settingsDetails
     */
    mobileSettingsUpdated(settingsDetails){
        this.settingsDetails = settingsDetails;
    }

    /**
     * Function used to save the mobile settings details
     */
    save(){
        this.showLoadingModal();
        this.mobileSettingsService.createNewMobileSettings(this.settingsDetails)
            .subscribe(
                ms => {
                    this.settingsDetails.id = ms;
                    if(this.tab=="tab3")
                        this.areaSpecificationForm.saveRefineDetails();
                    this.hideLoadingModal();
                },
                error => {
                    alert("mobileSettingsService error: " + error);
                    this.hideLoadingModal();
                }
            );
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