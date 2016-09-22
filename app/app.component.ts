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
    @Input('selectedTab') tab;
    @ViewChild(AreaSpecificationForm) areaSpecificationForm: AreaSpecificationForm;
    @ViewChild(MainSettingsForm) mainSettingsForm: MainSettingsForm;

    ngOnInit(){
        this.page="mainPage";
    }
    defaultButtonClicked(evt){

        if(this.page == "mainPage") {
            this.mainSettingsForm.onSubmit();
            this.page = "settingsDetails";
            this.tab = "tab0";
        }
        else {
            var tabIndex = this.tab.split("tab")[1];
            tabIndex++;
            if(tabIndex<=3)
                this.tab= "tab" + tabIndex;
            this.areaSpecificationForm.openTab(this.tab);
        }
        this.changeButtonTitle(evt.currentTarget);
    }
    secondaryButtonClicked(evt){
        var tabIndex = this.tab.split("tab")[1];
        tabIndex--;
        if(tabIndex>=0) {
            this.tab = "tab" + tabIndex;
            this.areaSpecificationForm.openTab(this.tab);
        }
        else
            this.page="mainPage";
    }
    changeButtonTitle(button){
        if(this.tab=="tab3" || this.page=="mainPage")
            button.textContent="Save Project";
        else
            button.textContent="Next";

        var secondaryButton = document.getElementById("secondaryButton");
        if(this.page!="mainPage")
            secondaryButton.textContent="Back";
        else
            secondaryButton.textContent="Cancel";
    }
    updateSelectedPage(tabName){
        this.tab = tabName;
        var button = document.getElementById("defaultButton");
        this.changeButtonTitle(button);
    }
}