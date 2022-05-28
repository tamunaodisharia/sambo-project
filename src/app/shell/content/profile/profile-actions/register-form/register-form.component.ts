import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {

    @Input() type: string = '';

    registerForm: any;
    formSubmitted: boolean = false;

    constructor() {
    
    }
    
    ngOnInit() {
        this.initializeForm();
    }

    onSubmit() {
        this.formSubmitted = true;

        console.log(this.type, 'type');

        if (this.registerForm.invalid) return;
        console.log('validdd');
    }

    addControls() {
        if (this.type === 'coach') {
            this.registerForm.addControl('club', new FormControl('', Validators.required));
            this.registerForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
            this.registerForm.addControl('password', new FormControl('', Validators.required));
        } else if (this.type === 'referee') {
            this.registerForm.addControl('description', new FormControl(''));
        } else if (this.type === 'sportsman') {
            this.registerForm.addControl('birthDate', new FormControl('', Validators.required));
            this.registerForm.addControl('weight', new FormControl('', [Validators.required, Validators.email]));
            this.registerForm.addControl('height', new FormControl('', Validators.required));
            this.registerForm.addControl('club', new FormControl('', Validators.required));
        }
    }

    private initializeForm() {
        this.registerForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required)
          });
          this.addControls();
    }
}