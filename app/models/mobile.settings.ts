export class MobileSettings {
    constructor(public id: number, public activityDescription: string, public radius: number, public proposalId: string, public projectId: string,
	public loiterTime: number, public minSpeed: number, public maxSpeed: number, public expirationTime: number,
	public currentlyAtLocation: boolean, public activityTypes: string,public traffic_type_id: number) { }
}