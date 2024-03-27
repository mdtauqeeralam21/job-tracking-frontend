import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

   
  form: any = {
    name: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private router: Router,
    private stService:StorageService,
    private toastr:ToastrService,
    ) { }

  onSubmit() {
    this.authService.register(this.form).subscribe({
      next: data => {
        console.log(data);
        this.stService.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastr.success('User registered successfully!', 'Success');
        this.router.navigate(['dashboard']).then(() => {
          window.location.reload();
       });
      },
      error: err => {
        console.error(err);
        //this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.toastr.error('Not registered! Try after some time', 'Error');
      }
    });
  }
}
