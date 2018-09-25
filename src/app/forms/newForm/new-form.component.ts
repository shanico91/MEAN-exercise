import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';

import { IField } from '../fieldModel';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  pageTitle: string = 'Create a new Form!';
  fieldTypes = ['text', 'color', 'date', 'email', 'tel', 'number'];
  typeNotChosen = false;
  done: Boolean = false;
  name: string = '';
  @ViewChild('myForm') myForm;
  fields: IField[] = [];
  field: IField = new IField('', '', '');

  constructor(private router: Router,
    private formService: FormService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.fields.push(this.field);
    this.field = new IField('', '', '');
    this.typeNotChosen = false;

    this.myForm.resetForm();
  }

  onDone(): void {
    this.done = true;
  }

  onSubmit(): void {
    this.postForm();
    this.router.navigate(['/forms']);
  }

  validateType(value) {
    if (value === 'default')
      this.typeNotChosen = true;
    else
      this.typeNotChosen = false;
  }
  postForm(): void {
    let form = JSON.stringify({ "name": this.name, "fields": this.fields });
    this.formService.postForm(form)
      .subscribe(
        data => console.log('posted data: ', data),
        err => console.log('error:', err)
      );
  }

  onBack(): void {
    this.router.navigate(['/forms']);
  }
}
