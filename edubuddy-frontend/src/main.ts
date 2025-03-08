import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { CoursesComponent } from './app/components/courses/courses.component';
import { QuizComponent } from './app/components/quiz/quiz.component';
import { LoginComponent } from './app/components/login/login.component';
import { SignupComponent } from './app/components/signup/signup.component';
import { AuthService } from './app/services/auth.service';
import { AuthGuard } from './app/guards/auth.guard';
import { environment } from './environments/environment';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'login', component: LoginComponent },  // No guard here, accessible by anyone
  { path: 'signup', component: SignupComponent },  // No guard here, accessible by anyone
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    AuthService,
    AuthGuard
  ]
}).catch(err => console.error(err));
