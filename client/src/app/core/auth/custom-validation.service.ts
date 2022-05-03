import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  authSubs: Subscription;
  usernameAvailable: boolean;
  emailAvailable: boolean;

  constructor(private authService: AuthService){ }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (control: AbstractControl) => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return ({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    }
  }

  isInt(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
          return null;
        }

        if (!Number.isInteger(+control.value)) {
          control.setErrors({ notInteger: true })
          return ({ notInteger: true });
        } else {
          control.setErrors({ notInteger: false })
          return null;
        }
    }
  }

  isNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      if (isNaN(+control.value)) {
        control.setErrors({ notNumber: true });
        return ({ notNumber: true });
      } else {
        control.setErrors({ notNumber: false });
        return null;
      }
  }
  }

  isNonNegative(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      if (+control.value < 0) {
        control.setErrors({ isNegative: true });
        return ({ isNegative: true });
      } else {
        control.setErrors({ isNegative: false });
        return null;
      }
    }
  }

  classPriorValid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      var elements: string[] = control.value.replace(/\s/g, '').split(",");
      if (elements.length != 2) {
        control.setErrors({ isInvalid: true });
        return ({ isInvalid: true });
      } else if (elements.length == 2) {
        if (isNaN(+elements[0]) || isNaN(+elements[1]) || elements.includes('')) {
          control.setErrors({ isInvalid: true });
          return ({ isInvalid: true });
        }
      } else {
        control.setErrors({ isInvalid: false });
        return null;
      }
    }
  }

  maxFeaturesValid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => { 
      if (!control.value) {
        return null;
      }

      const values: string[] = ['auto', 'sqrt', 'log2'];
      if (values.includes(control.value) || !isNaN(+control.value)) {
        control.setErrors({ isInvalid: false });
        return null;
      } else {
        control.setErrors({ isInvalid: true });
        return ({ isInvalid: true });
      }
    }
  }

  maxFeaturesValid2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => { 
      if (!control.value) {
        return null;
      }

      const values: string[] = ['sqrt', 'log2'];
      if (values.includes(control.value) || !isNaN(+control.value)) {
        control.setErrors({ isInvalid: false });
        return null;
      } else {
        control.setErrors({ isInvalid: true });
        return ({ isInvalid: true });
      }
    }
  }

  isDict(val: string) {
    try {
      var parsedVal = JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }

  classWeightValid(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => { 
      if (!control.value) {
        return null;
      }

      // First, check if 'balanced'
      else if (control.value === 'balanced') {
        control.setErrors({ isInvalid: false });
        return null;
      }

      // Check if dict or list of dict
      else if (this.isDict(control.value)) {
        control.setErrors({ isInvalid: false });
        return null;
      }

      // Input is invalid
      else {
        control.setErrors({ isInvalid: true });
        return ({ isInvalid: true });
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUsername(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUsername(userName: string) {
    // first, check if the username is available
    if (userName == '') {
      return true;
    }

    this.authSubs = this.authService
      .usernameAvailable(userName)
      .subscribe({
        next: (v) => this.usernameAvailable = !JSON.parse(v['available']),
        error: (e) => console.error(e)
      }
    );
    return (this.usernameAvailable);
  }

  emailValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateEmail(userControl.value)) {
          resolve({ emailNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateEmail(email: string) {
    // first, check if the username is available
    if (email == '') {
      return true;
    }

    this.authSubs = this.authService
      .emailAvailable(email)
      .subscribe({
        next: (v) => this.emailAvailable = !JSON.parse(v['available']),
        error: (e) => console.error(e)
      }
    );
    return (this.emailAvailable);
  }
}