import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.scss']
})

export class ProfileActionsComponent implements OnInit  {

    registerForm: any;
    formSubmitted: boolean = false;

    constructor() {
    
    }
    
    ngOnInit() {
        this.initializeForm();
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.registerForm.invalid) return;
    }

    private initializeForm() {
        this.registerForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            description: new FormControl('')
          });
    }
}