import { 
  Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormControl,
  Validators 
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService, EventService, MessageService, MessageType} from '../../../shared/shared.service';

declare var $: any;


@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {
  form        : FormGroup;
  submitted   : boolean = false;
  loading     : boolean = false;

  constructor(
      private router        : Router,
      private route         : ActivatedRoute,
      private sharedService : SharedService,
      private eventService  : EventService
    ) {
    this.form = new FormGroup({
      name         : new FormControl('', Validators.required),
      description  : new FormControl('', Validators.required),
      billingType  : new FormControl('monthly'),
      billingPrice : new FormControl('', Validators.required),
      photo        : new FormControl(null),
      video        : new FormControl(null),
    });

    $('#example-getting-started').multiselect();
  }

  ngOnInit() {
  }

  onImageChanged(event: any) {
      this.form.controls['photo'].setValue(event.target.files && event.target.files[0]);
  }

  onVideoChanged(event: any) {
      this.form.controls['video'].setValue(event.target.files && event.target.files[0]);
  }

  selectbillingType(plan: string): void {
      this.form.controls['billingType'].setValue(plan);
  }

  onSubmit(form: FormGroup) {
      this.submitted = true;

      if (this.form.valid) {
          /**
           * start uploading...
           */
          this.loading = true;
          this.sharedService.addProgram(this.form.value)
            .then((res)=> {
                this.loading = false;
                MessageService.showMessage('Program \'' + this.form.value.name + '\' has been added successfully.', MessageType.SUCCESS);
                this.eventService.addEvent('updated:program');
                this.router.navigate(['/dashboard'], [{relativeTo: this.route}]);
            }, (error)=> {
                this.loading = false;
                MessageService.showMessage(error.message || 'Unknown error', MessageType.WARNING);
            });
      }
  }
}
