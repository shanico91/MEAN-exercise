import { Component, OnInit } from '@angular/core';
import { IForm } from './form';
import { FormService } from './form.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  pageTitle: string = 'Form List';
  filteredForms: IForm[] = [];
  errorMessage: string;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredForms = this.listFilter ? this.performFilter(this.listFilter) : this.forms;
  }

  forms: IForm[] = [];

  constructor(private formService: FormService,
              private router: Router) { }

  performFilter(filterBy: string): IForm[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.forms.filter((form: IForm) =>
      form.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.formService.getForms().subscribe(
      forms => {
        this.forms = forms;
        this.filteredForms = this.forms;
      },
      error => this.errorMessage = <any>error
    );
    this.filteredForms = this.forms;
  }

  onNew(): void {
    this.router.navigate(['/newform']);
  }
}
