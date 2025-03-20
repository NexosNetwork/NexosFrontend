import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';

const routes: Routes = [
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'user-guide',
    component: UserGuideComponent
  },
  {
    path: 'contact-support',
    component: ContactSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }