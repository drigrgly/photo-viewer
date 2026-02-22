import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorDisplayInput } from "../shared/error-display-input/error-display-input.component";

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, ErrorDisplayInput],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder =  inject(FormBuilder);

  loginForm = this.formBuilder.group({
    username: ['',
      [Validators.required]
    ],
    password: ['',
      [Validators.required]
    ]

  });


  submitForm() {

    if (!this.loginForm.valid) 
      return;

  }
}
