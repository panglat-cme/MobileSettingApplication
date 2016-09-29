import {Component, Input} from "angular2/core";
import {ScheduleSetting, ScheduleSettingDays} from "../models/scheduleSetting";
import {ScheduleSettingService} from '../services/schedulesetting.service';

class DayOfTheWeek {
	constructor(public dayNumber: number, public name:string, public enabled: boolean, public fromTime: string, public toTime: string) { }
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
    triggerScheduleSelectedValue = "anyDayTime";
    loiterTime = "";
    loiterTimeUnit = "";
    minSpeed = "";
    minSpeedUnit = "";
    triggerExpiration = "";
    triggerExpirationUnit = "";
    maxSpeed = "";
    maxSpeedUnit="";

	
	dayOfTheWeekArray = [
		new DayOfTheWeek(1, "Monday", false, "00:00", "00:00"),
		new DayOfTheWeek(2, "Tuesday", false, "00:00", "00:00"),
		new DayOfTheWeek(3, "Wednesday", false, "00:00", "00:00"),
		new DayOfTheWeek(4, "Thursday", false, "00:00", "00:00"),
		new DayOfTheWeek(5, "Friday", false, "00:00", "00:00"),
		new DayOfTheWeek(6, "Saturday", false, "00:00", "00:00"),
		new DayOfTheWeek(7, "Sunday", false, "00:00", "00:00")];

	constructor(private scheduleSettingService : ScheduleSettingService) {
	}
	
	ngOnInit(){
		this.showLoadingModal()
		this.scheduleSettingService.getScheduleSetting(27)
			.subscribe(
				scheduleSetting => {
					this.updateDayOfTheWeekArray(scheduleSetting);
					this.hideLoadingModal();
				},
				error => {
					alert("Schedule Setting error: " + error);
					this.hideLoadingModal();
				}
			);
			
		this.radius = this.mobileSettings.radius;

		this.minSpeed = this.mobileSettings.min_speed;
		this.minSpeedSelected = this.mobileSettings.min_speed > 0;

		this.maxSpeed = this.mobileSettings.max_speed;
		this.maxSpeedSelected = this.mobileSettings.max_speed > 0;

		this.loiterTime = this.mobileSettings.loiter_time;
		this.loiterTimeSelected = this.mobileSettings.loiter_time > 0;

		this.triggerExpiration = this.mobileSettings.expiration_time;
		this.triggerExpirationSelected = this.mobileSettings.expiration_time > 0;

		this.startAtLocationSelected = this.mobileSettings.currently_at_location;

		this.setDefaultUnits();
	}
	
	updateDayOfTheWeekArray(scheduleSetting) {
		if(scheduleSetting.anyDayTime == true) {
			this.triggerScheduleSelectedValue = "anyDayTime";
		} else {
			this.triggerScheduleSelectedValue = "onlyTheseDaysAndTimes";
		}

		for(let i = 0; i < this.dayOfTheWeekArray.length; i++) {
			let day = this.dayOfTheWeekArray[i];
			day.enabled = false;
			day.fromTime = "00:00";
			day.toTime = "00:00";
		}
		
		let scheduleSettingList = scheduleSetting.scheduleSettingList;
		for(let i = 0; i < scheduleSettingList.length; i++) {
			let schedSettingdSetting = scheduleSettingList[i];
			let day = this.dayOfTheWeekArray.find(d => d.dayNumber == schedSettingdSetting.dayOfWeek);
			if(day !== undefined) {
				day.enabled = true;
				day.fromTime = schedSettingdSetting.fromTime;
				day.toTime = schedSettingdSetting.toTime;
			}
		}
	}

	getScheduleSetting(){
		let scheduleSetting = new ScheduleSetting();
		scheduleSetting.scheduleSettingList = new Array<ScheduleSettingDays>();

		if(this.triggerScheduleSelectedValue == "anyDayTime") {
			scheduleSetting.anyDayTime = true;
		} else {
			scheduleSetting.anyDayTime = false;
			scheduleSetting.scheduleSettingList = new Array<ScheduleSettingDays>();
			for(let i = 0; i < this.dayOfTheWeekArray.length; i++) {
				let day = this.dayOfTheWeekArray[i];
				if(day.enabled) {
					let scheduleSettingDays = new ScheduleSettingDays();
					scheduleSettingDays.dayOfWeek = day.dayNumber;
					scheduleSettingDays.fromTime = day.fromTime;
					scheduleSettingDays.toTime = day.toTime;
					scheduleSetting.scheduleSettingList.push(scheduleSettingDays);
				}
			}
		}
		return scheduleSetting;
	}
		
	saveTriggerSchedule(){
		let scheduleSetting = this.getScheduleSetting();
		this.showLoadingModal()
		this.scheduleSettingService.setScheduleSetting(27, scheduleSetting)
			.subscribe(
				ret => {
					alert("save Trigger Schedule Ok");
					this.hideLoadingModal();
				},
				error => {
					alert("Save Trigger Schedule error: " + error);
					this.hideLoadingModal();
				}
			);
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

			this.mobileSettings.loiter_time = Math.round(this.mobileSettings.loiter_time);
		} else {
		 	this.mobileSettings.loiter_time = 0;
		}


		if (this.minSpeedSelected){
			if (this.minSpeedUnit == "m")
				this.mobileSettings.min_speed = this.minSpeed;
			else
				this.mobileSettings.min_speed = this.updateMinSpeed("m");
		
			this.mobileSettings.min_speed = Math.round(this.mobileSettings.min_speed);
		} else {
		 	this.mobileSettings.min_speed = 0;
		}

		if (this.maxSpeedSelected){
			if (this.maxSpeedUnit == "m")
				this.mobileSettings.max_speed = this.maxSpeed;
			else
				this.mobileSettings.max_speed = this.updateMaxSpeed("m");
		
		this.mobileSettings.max_speed = Math.round(this.mobileSettings.max_speed);
		} else {
		 	this.mobileSettings.max_speed = 0;
		}

		if (this.triggerExpirationSelected){
			if (this.triggerExpirationUnit == "m")
				this.mobileSettings.expiration_time = this.triggerExpiration;
			else
				this.mobileSettings.expiration_time = this.updateExpirationTime("m");
		
		this.mobileSettings.expiration_time = Math.round(this.mobileSettings.expiration_time);
		} else {
		 	this.mobileSettings.expiration_time = 0;
		}
		
		if (this.startAtLocationSelected)
			this.mobileSettings.currently_at_location = 1;
		else
			this.mobileSettings.currently_at_location = 0;
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

}