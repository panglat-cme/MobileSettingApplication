import {Component, Input} from "angular2/core";
import {ScheduleSetting} from "../models/scheduleSetting";
import {ScheduleSettingService} from '../services/schedulesetting.service';

class DayOfTheWeek {
	constructor(public name:string, public enabled: boolean, public fromTime: string, public ToTime: string) { }
};

@Component({
    selector: 'geofenceTriggerOptions',
    templateUrl: 'app/geofenceTriggerOptions/geofenceTriggerOptions.component.html',
    styleUrls: ['app/geofenceTriggerOptions/geofenceTriggerOptions.component.css'],
    providers: [ScheduleSettingService],
    directives: [],
    pipes: []
})

export class GeofenceTriggerOptions{
    @Input("settingsDetails") mobileSettings;
    loiterTimeSelected = false;
    minSpeedSelected = false;
    triggerExpirationSelected = false;
    maxSpeedSelected = false;
    startAtLocationSelected = false;
    radius = "";
    radiusUnit = "";
    triggerScheduleSelectedValue = "";
    loiterTime = "";
    loiterTimeUnit = "";
    minSpeed = "";
    minSpeedUnit = "";
    triggerExpiration = "";
    triggerExpirationUnit = "";
    maxSpeed = "";
    maxSpeedUnit="";

	
	dayOfTheWeekArray = [
		new DayOfTheWeek("Monday", false, "00:00", "00:00"),
		new DayOfTheWeek("Tuesday", false, "00:00", "00:00"),
		new DayOfTheWeek("Wednesday", false, "00:00", "00:00"),
		new DayOfTheWeek("Thursday", false, "00:00", "00:00"),
		new DayOfTheWeek("Friday", false, "00:00", "00:00"),
		new DayOfTheWeek("Saturday", false, "00:00", "00:00"),
		new DayOfTheWeek("Sunday", false, "00:00", "00:00")];
	
	scheduleSetting = new ScheduleSetting();

	constructor(private scheduleSettingService : ScheduleSettingService) {
	}
	
	ngOnInit(){
		this.scheduleSettingService.getScheduleSetting(27)
			.subscribe(
				scheduleSetting => {
					this.scheduleSetting = scheduleSetting;
					
				},
				error => {
					alert("Refine Locations error: " + error);
					
				}
			);
			
		this.radius = this.mobileSettings.radius;
		this.minSpeed = this.mobileSettings.min_speed;
		this.maxSpeed = this.mobileSettings.max_speed;
		this.loiterTime = this.mobileSettings.loiter_time;
		this.triggerExpiration = this.mobileSettings.expiration_time;
		this.startAtLocationSelected = this.mobileSettings.currently_at_location;
		this.setDefaultUnits();
	}
	
	/**
	 * Function used to update Radius value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateRadius(selectedOption) {
		if(selectedOption.currentTarget.value == "f") {
		 	this.radius = this.radius * 3.2808;
		 	// Fix for IE and Edge browsers
			this.radiusUnit = "f";
		} else if (selectedOption.currentTarget.value == "m") {
			this.radius = this.radius / 3.2808;
			// Fix for IE and Edge browsers
			this.radiusUnit = "m";
		}
	}

	/**
	 * Function used to update Loiter Time value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateLoiterTime(selectedOption) {
		if(selectedOption.currentTarget.value == "h") {
		 	this.loiterTime = this.loiterTime / 60;
		 	// Fix for IE and Edge browsers
			this.loiterTimeUnit = "h";
		} else if (selectedOption.currentTarget.value == "m") {
			this.loiterTime = this.loiterTime * 60;
			// Fix for IE and Edge browsers
			this.loiterTimeUnit = "m";
		}
	}

	/**
	 * Function used to update Min Speed value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateMinSpeed(selectedOption) {
		if(selectedOption.currentTarget.value == "m") {
			this.minSpeed = this.minSpeed / 1.60934;
			// Fix for IE and Edge browsers
			this.minSpeedUnit = "m";
		} else if(selectedOption.currentTarget.value == "k") {
			this.minSpeed = this.minSpeed * 1.60934;
			// Fix for IE and Edge browsers
			this.minSpeedUnit = "k";
		}
	}

	/**
	 * Function used to update Max Speed value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateMaxSpeed(selectedOption) {
		if(selectedOption.currentTarget.value == "m") {
			this.maxSpeed = this.maxSpeed / 1.60934;
			// Fix for IE and Edge browsers
			this.maxSpeedUnit = "m";
		} else if(selectedOption.currentTarget.value == "k") {
			this.maxSpeed = this.maxSpeed * 1.60934;
			// Fix for IE and Edge browsers
			this.maxSpeedUnit = "k";
		}
	}

	/**
	 * Function used to update Expiration Time value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateExpirationTime(selectedOption) {
		if(selectedOption.currentTarget.value == "h") {			
		 	this.triggerExpiration = this.triggerExpiration / 60;
		 	// Fix for IE and Edge browsers
			this.triggerExpirationUnit = "h";
		} else if (selectedOption.currentTarget.value == "m") {
			this.triggerExpiration = this.triggerExpiration * 60;
			// Fix for IE and Edge browsers
			this.triggerExpirationUnit = "m";
		}
	}
	
	/**
	 * Function used to update Max Speed value
	 * when the unit is modified
	 * @param selectedOption
	 */
	private setDefaultUnits() {
		this.radiusUnit = "f";
		this.loiterTimeUnit = "m";
		this.minSpeedUnit = "m";
		this.maxSpeedUnit = "m";
		this.triggerExpirationUnit = "m";
	}

}