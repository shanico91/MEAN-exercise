import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormListComponent } from './form-list.component';
import { SubmissionsDetailComponent } from './submissions/submissions-detail.component';
import { SubmitDetailComponent } from './submit/submit-detail.component';
import { NewFormComponent } from './newForm/new-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'forms', component: FormListComponent },
      { path: 'submissions/:id', component: SubmissionsDetailComponent },
      { path: 'forms/:id', component: SubmitDetailComponent },
      { path: 'newform', component: NewFormComponent }
    ])

  ],
  declarations: [
    FormListComponent,
    SubmissionsDetailComponent,
    SubmitDetailComponent,
    NewFormComponent
  ]
})
export class MyFormModule { }
