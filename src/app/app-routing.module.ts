import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { CreateComponent } from './articles/create/create.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: ArticlesComponent},
  {path: 'create', pathMatch: 'full', component: CreateComponent},
  {path: 'update/:index', pathMatch: 'full', component: CreateComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
