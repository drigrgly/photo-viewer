import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorDisplayInput } from '../shared/error-display-input/error-display-input.component';
import { RegisterService } from './register-service';
import { RegisterRequest } from './register-request';

@Component({
  selector: 'register',
  imports: [ReactiveFormsModule,
    ErrorDisplayInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private  registerService = inject(RegisterService);

  usernameMinLength = 3

  profileForm = this.formBuilder.group({
    email: ['',
      [Validators.required, Validators.email]
    ],
    username: ['',
      [Validators.required, Validators.minLength(this.usernameMinLength)]
    ],
    passwords: this.formBuilder.group({
      password: ['',
        [Validators.required]
      ],
      confirmPassword: ['',
        [Validators.required]
      ],
    })
  });

  get passwordGroupControls() {
    return this.profileForm.controls.passwords.controls
  }

  submitForm() {
    console.warn(this.profileForm.value);

    if (!this.profileForm.valid) {
      console.warn("Form is invalid")
      return;
    }

    let regObject: RegisterRequest = {
      email: this.profileForm.value.email!,
      username: this.profileForm.value.username!,
      password: this.profileForm.value.passwords?.password!,
      confirmPassword: this.profileForm.value.passwords?.confirmPassword!
    }

    this.registerService.submitForm(regObject).subscribe(response => {
      if (response.isOperationSuccessful)
        console.log(response.message)
      else
        console.warn(response.message);
    });
  }

  checkMatchingPasswords(passwordGroup: FormGroup) {
    const password = this.profileForm.value.passwords?.password;
    const confirmPassword = this.profileForm.value.passwords?.confirmPassword;

    if (password == null || confirmPassword == null)
      return;

    if (password != confirmPassword)
      passwordGroup.setErrors({passwordsNotMatching: true})
    else
      passwordGroup.setErrors(passwordGroup.errors)

  }
}
