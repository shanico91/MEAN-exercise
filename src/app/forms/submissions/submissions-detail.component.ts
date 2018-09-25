import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../form.service';
import { IField } from '../fieldModel';

@Component({
  templateUrl: './submissions-detail.component.html',
  styleUrls: ['./submissions-detail.component.css']
})
export class SubmissionsDetailComponent implements OnInit {
  pageTitle: string = 'Submissions Details for Form';
  fieldNames: Object = {};
  ordered: Object[] = [];
  errorMessage: string = '';
  objectValues = Object.values;
  ObjectKeys = Object.keys;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formService: FormService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    if (id) {
      this.getFields(id);
      this.getSubmissions(id);
      
    }
  }

  getFields(id: string) {
    this.formService.getFields(id).subscribe(
      fields => {
        let importfields: IField[] = [];
        importfields = fields;
        for (let field of importfields) {
          this.fieldNames[field.label] = field.name;
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  getSubmissions(id: string) {
    this.formService.getSubmissions(id).subscribe(
      submissions => {
        let importSubmissions: Object[] = [];
        importSubmissions = submissions;
        for (let submission of importSubmissions) {
          let orderedsub = {};
          for (let x of this.ObjectKeys(this.fieldNames)) {
            let fieldName = this.fieldNames[x];
            orderedsub[x] = submission[fieldName];
          }
          this.ordered.push(orderedsub);
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this.router.navigate(['/forms']);
  }
}
