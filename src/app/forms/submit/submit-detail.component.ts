import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { IField } from '../fieldModel';

@Component({
  selector: 'app-submit-detail',
  templateUrl: './submit-detail.component.html',
  styleUrls: ['./submit-detail.component.css']
})
export class SubmitDetailComponent implements OnInit {
  pageTitle: string = 'Submit form';
  fields: IField[] = [];
  errorMessage: string = '';
  myGroup: FormGroup;
  notDone: boolean = true;
  id: string;
  formDetails: Object = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formService: FormService ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${this.id}`;
    if (this.id) {
      this.getFieldsAndFormGroup(this.id);
    }
  }

  getFieldsAndFormGroup(id: string) {
    this.formService.getFields(id).subscribe(
      fields => {
        this.fields = fields;
        this.toFormGroup();
      },
      error => this.errorMessage = <any>error
    );
  }

  toFormGroup() {
    let group: any = {};

    (this.fields).forEach(field => {
      group[field.name] = new FormControl();
    });

    this.myGroup = new FormGroup(group);
    
  }

  onSubmit(): void {
    this.postForm();
    this.router.navigate(['/forms']);
  }

  postForm(): void {

    let form = JSON.stringify(this.formDetails);
    this.formService.submitForm(this.id, form)
      .subscribe(
        data => console.log('posted data: ', data),
        err => console.log('error:', err)
      );

  }

  addField(fieldName: string, value: string): void {
    this.formDetails[fieldName] = value;
    this.validate();
  }

  validate(): void {
    let count = 0;
    for (let value of Object.values(this.formDetails)) {
      if (value != null && value != "")
        count++;
      else
        break;
    }
    if (count == this.fields.length)
      this.notDone = false;
    else
      this.notDone = true;

  }

  onBack(): void {
    this.router.navigate(['/forms']);
  }

}
