export class ScheduleSettingDays {
    constructor(public dayOfWeek: number, public fromTime: string, public toTime: string) { }
}

export class ScheduleSetting {
    constructor(public anyDayTime: boolean, public scheduleSettingList: Array<ScheduleSettingDays>) { }
}