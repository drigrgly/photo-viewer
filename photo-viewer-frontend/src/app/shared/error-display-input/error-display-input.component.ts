import {Component, computed, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'form-error-display',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="inputGroup">
      <ng-content/>

      @for (handledItem of handledErrorsMap(); track handledItem.errorKey) {
        @if (formElement().dirty && formElement().errors?.[handledItem.errorKey]) {
          <div class="inputError">
            <p>{{ handledItem.errorMsg }}</p>
          </div>
        }
      }

    </div>
  `,
  styleUrl: './error-display-input.component.scss',
})
export class ErrorDisplayInput {
  formElement = input.required<FormGroup | FormControl>();
  // Key value pairs of the errors and their messages
  handledErrors = input<Record<string, string>>({});

  handledErrorsMap = computed(() => {
    return Object.keys(this.handledErrors()).map((key: string) => (
      {errorKey: key, errorMsg: this.handledErrors()[key]}
    ))
  });
}
