import { TYPE_TIME } from "../enums/DataEnums";

export const durationBetween = (dateStart, dateEnd, typeReturn = TYPE_TIME.SECOND) => {
    const date1 = new Date(dateStart);
    const date2 = new Date(dateEnd);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    switch(typeReturn) {
        case TYPE_TIME.SECOND: 
            return Math.ceil(diffTime / 1000)
        case TYPE_TIME.MINUTE: 
            return Math.ceil(diffTime / 1000 / (60))
        case TYPE_TIME.HOUR: 
            return Math.ceil(diffTime / 1000 / (3600))
        default:
            return Math.ceil(diffTime)
    }
}