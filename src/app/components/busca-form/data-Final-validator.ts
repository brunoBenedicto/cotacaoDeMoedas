import { AbstractControl } from "@angular/forms";

export function dataFinalValidator(control: AbstractControl) {
    const username = control.value as string;
    if(username !== username?.toLowerCase()) {
        return { minusculo: true };
    } else
    return null;
}
