export class MobileSettings {
    constructor(public id: number,
				public activity_description: string,
				public radius: number,
				public proposal_id: number,
				public project_id: number,
				public loiter_time: number,
				public min_speed: number,
				public max_speed: number,
				public expiration_time: number,
				public currently_at_location: number,
				public activity_types: string,
				public traffic_type_id: number,
				public country_id: number,
				public quota_type_id: number) { }
}