import {Component, Input} from "angular2/core";

@Component({
    selector: 'geofenceTriggerOptions',
    templateUrl: 'app/geofenceTriggerOptions/geofenceTriggerOptions.component.html',
    styleUrls: ['app/geofenceTriggerOptions/geofenceTriggerOptions.component.css'],
    providers: [],
    directives: [],
    pipes: []
})

export class GeofenceTriggerOptions{
    @Input("settingsDetails") mobileSettings;
    loiterTimeSelected = false;
}