import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-untyped-form-demo',
  templateUrl: './untyped-form-demo.component.html',
  styleUrls: ['./untyped-form-demo.component.css']
})
export class UntypedFormDemoComponent implements OnInit {

  form: UntypedFormGroup;
  cities = ['Taipei', 'Taichung', 'Kaohsiung'];

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      email: this.fb.control('i@me.com', {validators: [Validators.email, Validators.required]}),
      password: this.fb.control('abc123', {validators: [Validators.minLength(6)]}),
      address: this.fb.control('No. 201, Furong Rd., Houli Dist.'),
      city: this.fb.control('Taichung'),
      zip: this.fb.control('421'),
      checkMeOut: this.fb.control(true),
    });
  }

  ngOnInit(): void {
    // compile error
    // this.form.get('zip')?.disabled();
    (this.form.get('zip') as UntypedFormControl).disable();

    this.form.get('city')?.valueChanges?.subscribe(city => {
      // city型別是any
      console.log(city);
    });
  }

  update(): void {
    this.form.patchValue({
      email: 'iamhere@me.com',
      //address: 'haha',
      // sometimes we have typo...
      adress: 'haha',
      city: 'Taipei',
    });
  }

}
