import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { CustomValidationService } from '../custom-validation.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appValidateEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => ValidateEmailDirective), multi: true }]

})
export class ValidateEmailDirective implements Validator {

  constructor(private customValidator: CustomValidationService) { }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    return this.customValidator.emailValidator(control);
  }
}