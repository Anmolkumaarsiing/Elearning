import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: 'courses' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
