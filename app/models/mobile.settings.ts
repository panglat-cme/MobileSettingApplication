export class MobileSettings {
    constructor(public id: number,
				public activityDescription: string,
				public radius: number,
				public proposalId: number,
				public projectId: number,
				public loiterTime: number,
				public minSpeed: number,
				public maxSpeed: number,
				public expirationTime: number,
				public currentlyAtLocation: number,
				public activityTypes: string,
				public traffic_type_id: number,
				public countryId: number,
				public quotaTypeId: number) { }
}