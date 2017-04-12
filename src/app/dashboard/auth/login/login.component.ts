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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form      : FormGroup;
  submitted : boolean = false;
  loading   : boolean = false;

  constructor(
    public authService  : AuthService,
    public router       : Router,
    public route        : ActivatedRoute
  ) { 
    this.form = new FormGroup({
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
      this.authService.signInWithEmail(form.value)
        .then(_=> this.router.navigate(['/dashboard'], [{relativeTo: this.route}]))
        .catch((error)=> {
            this.loading = false;
            MessageService.showMessage(error.message, MessageType.WARNING);
            this.form.reset();
        });
    }
  }
}
