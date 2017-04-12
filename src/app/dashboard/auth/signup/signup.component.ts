import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormControl,
  Validators 
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { MessageService, MessageType } from '../../../shared/shared.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  loading   : boolean = false;

  constructor(
    public authService  : AuthService,
    public router       : Router,
    public route        : ActivatedRoute
  ) { 
    this.form = new FormGroup({
      fullname  : new FormControl('', Validators.required),
      email     : new FormControl('', Validators.required),
      password  : new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.authService.getAuth()
      .map(state=>!!state)
      .subscribe((authenticated) => {
        if (authenticated)
          this.router.navigate(['/dashboard'], [{relativeTo: this.route}]);
      }, (error) => {
        MessageService.showMessage(error.message || 'Unknown error.', MessageType.WARNING);
      });
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.authService.signUpWithEmail(form.value)
        .then(_=> {
          this.loading = false;
          this.router.navigate(['./dashboard'], [{relativeTo: this.route}]);
        })
        .catch((error)=> {
          this.loading = false;
          MessageService.showMessage(error.message, MessageType.WARNING);
          this.form.reset();
        });
    }
  }
}
