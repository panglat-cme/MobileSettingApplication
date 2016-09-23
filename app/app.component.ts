import {Component, ViewChild, Input} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { DiyServerService } from './services/diyServer.service';
import {AreaSpecificationForm} from './areaSpecificationForm/areaSpecificationForm.component';
import {MainSettingsForm} from './mainSettingsForm/mainSettingsForm.component';

@Component({
    selector : 'app',
    directives: [AreaSpecificationForm,MainSettingsForm],
    templateUrl : 'app/app.component.html',
    styleUrls : ['app/app.component.css'],
	providers : [HTTP_PROVIDERS, DiyServerService]
})
export class AppComponent {
    page="";
    proposalId = 2221;
    projectId = 21234;

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
            this.mainSettingsForm.onSubmit();
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
    }
    /**
     * Function used to the buttons' titles based on the tab or page the user is in
     */
    changeButtonsTitles(){
        //Retrieving the default button element
        var defaultButton = document.getElementById("defaultButton");
        //If user is on the last tab or on the main page then the button's title is Save Project
        if(this.tab=="tab3" || this.page=="mainPage")
            defaultButton.textContent="Save Project";
        //Otherwise the button title is Next
        else
            defaultButton.textContent="Next ";

        //Retrieving the secondary button element
        var secondaryButton = document.getElementById("secondaryButton");
        //If user is on the settings details page the title of the secondary button is Back
        if(this.page!="mainPage")
            secondaryButton.textContent=" Back";
        //Otherwise the button title tis Cancel
        else
            secondaryButton.textContent="Cancel";
    }
    /**
     * Function called when the user changes tab by clicking on it
     * @param tabName
     */
    updateSelectedPage(tabName){
        this.tab = tabName;
        this.changeButtonsTitles();
    }
}