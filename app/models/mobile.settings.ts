export class MobileSettings {
    constructor(public id: string, public activityDescription: string, public radius: string, public proposalId: string, public projectId: string, 
	public loiterTime: string, public minSpeed: string, public maxSpeed: string, public expirationTime: string,
	public currentlyAtLocation: boolean, public activityTypes: string) { }
}