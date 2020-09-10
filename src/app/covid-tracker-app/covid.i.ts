export interface IGlobalDataSummary {
    country?: string,
    confirmed?: number,
    deaths?: number,
    recovered?: number,
    active?: number
}   

export interface IDateWiseData {
    country?: string,
    cases?: number,
    date?: Date
}