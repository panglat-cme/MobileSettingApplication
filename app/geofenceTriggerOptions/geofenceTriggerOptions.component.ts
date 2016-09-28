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
		if(selectedOption == "f") {
		 	this.radius = this.radius * 3.2808;
		 	// Fix for IE and Edge browsers
			this.radiusUnit = "f";
		} else if (selectedOption == "m") {
			this.radius = this.radius / 3.2808;
			// Fix for IE and Edge browsers
			this.radiusUnit = "m";
		}
		return this.radius;
	}

	/**
	 * Function used to update Loiter Time value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateLoiterTime(selectedOption) {
		if(selectedOption == "h") {
		 	this.loiterTime = this.loiterTime / 60;
		 	// Fix for IE and Edge browsers
			this.loiterTimeUnit = "h";
		} else if (selectedOption == "m") {
			this.loiterTime = this.loiterTime * 60;
			// Fix for IE and Edge browsers
			this.loiterTimeUnit = "m";
		}
		return this.loiterTime;
	}

	/**
	 * Function used to update Min Speed value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateMinSpeed(selectedOption) {
		if(selectedOption == "m") {
			this.minSpeed = this.minSpeed / 1.60934;
			// Fix for IE and Edge browsers
			this.minSpeedUnit = "m";
		} else if(selectedOption == "k") {
			this.minSpeed = this.minSpeed * 1.60934;
			// Fix for IE and Edge browsers
			this.minSpeedUnit = "k";
		}
		return this.minSpeed;
	}

	/**
	 * Function used to update Max Speed value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateMaxSpeed(selectedOption) {
		if(selectedOption == "m") {
			this.maxSpeed = this.maxSpeed / 1.60934;
			// Fix for IE and Edge browsers
			this.maxSpeedUnit = "m";
		} else if(selectedOption == "k") {
			this.maxSpeed = this.maxSpeed * 1.60934;
			// Fix for IE and Edge browsers
			this.maxSpeedUnit = "k";
		}
		return this.maxSpeed;
	}

	/**
	 * Function used to update Expiration Time value
	 * when the unit is modified
	 * @param selectedOption
	 */
	updateExpirationTime(selectedOption) {
		if(selectedOption == "h") {
		 	this.triggerExpiration = this.triggerExpiration / 60;
		 	// Fix for IE and Edge browsers
			this.triggerExpirationUnit = "h";
		} else if (selectedOption == "m") {
			this.triggerExpiration = this.triggerExpiration * 60;
			// Fix for IE and Edge browsers
			this.triggerExpirationUnit = "m";
		}
		return this.triggerExpiration;
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

	/**
	 * Function used to set the values of the option in the
	 * mobile settings object
	 */
	updateMobileSettings() {
		if (this.radiusUnit == "f")
			this.mobileSettings.radius = this.radius;
		else
			this.mobileSettings.radius = this.updateRadius("f");

		if (this.loiterTimeSelected){
			if (this.loiterTimeUnit == "m")
				this.mobileSettings.loiter_time = this.loiterTime;
			else
				this.mobileSettings.loiter_time = this.updateLoiterTime("m");
		}

		if (this.minSpeedSelected){
			if (this.minSpeedUnit == "m")
				this.mobileSettings.min_speed = this.minSpeed;
			else
				this.mobileSettings.min_speed = this.updateMinSpeed("m");
		}

		if (this.maxSpeedSelected){
			if (this.maxSpeedUnit == "m")
				this.mobileSettings.max_speed = this.maxSpeed;
			else
				this.mobileSettings.max_speed = this.updateMaxSpeed("m");
		}

		if (this.triggerExpirationSelected){
			if (this.triggerExpirationUnit == "m")
				this.mobileSettings.expiration_time = this.triggerExpiration;
			else
				this.mobileSettings.expiration_time = this.updateExpirationTime("m");
		}
		
		if (this.startAtLocationSelected)
			this.mobileSettings.currently_at_location = 1;
		else
			this.mobileSettings.currently_at_location = 0;
	}
}