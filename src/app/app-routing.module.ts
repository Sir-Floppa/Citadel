import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';

const routes: Routes = [
  {path: '', component: ProjectsPageComponent},
  {path: 'newProject/:projectPath', component: NewProjectPageComponent},
  {path: 'projectView', component: ProjectViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ProjectsPageComponent,
  NewProjectPageComponent,
  ProjectViewComponent
]
