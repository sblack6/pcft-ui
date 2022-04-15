import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetEditorComponent } from './budget/budget-editor/budget-editor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // Add new paths here (order matters)
  { path: 'edit-budget', component: BudgetEditorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
