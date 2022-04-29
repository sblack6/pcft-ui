export function convertDatePickerOutputToApiDate(datePickerOutput: string): string {
    return datePickerOutput.slice(1, 11);
}