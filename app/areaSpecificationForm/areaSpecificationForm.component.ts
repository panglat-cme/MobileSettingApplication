import {Component} from 'angular2/core';

export class Location {
  constructor(public latitude: double, public longitude: double, public radius: double) { }
}

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css']
})
export class AreaSpecificationForm {
	_location : Location;
	_locations : Location[];
	constructor() {
		this._location = new Location(0.0, 0.0, 0.0);
		this._locations = [];
	}

    save() {
		this._locations.push(this._location);
		this._location = new Location(0.0, 0.0, 0.0);
    }
}