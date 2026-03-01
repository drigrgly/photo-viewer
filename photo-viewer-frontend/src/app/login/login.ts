import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorDisplayInput } from "../shared/error-display-input/error-display-input.component";
import { AuthService } from '../shared/service/auth-service';
import { LoginCredentials } from '../shared/model/login-credentials';
import { AuthResponse } from '../shared/model/auth-response';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, ErrorDisplayInput, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

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

    let credentials: LoginCredentials = {
      username: this.loginForm.controls.username.value!,
      password: this.loginForm.controls.password.value!
    }

    this.authService.login(credentials).subscribe({
      next: (resp: AuthResponse) => {
        console.log(resp.message);

        if (resp.isOperationSuccessful)
          this.router.navigate(["/"]);

      }
    })


  }
}
