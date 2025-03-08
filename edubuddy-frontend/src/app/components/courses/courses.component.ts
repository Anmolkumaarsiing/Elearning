import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';  // ✅ Import AuthService
import { Router } from '@angular/router';  // ✅ Import Router for navigation

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses: any[] = [];

  constructor(
    private courseService: CourseService,
    private authService: AuthService,  // ✅ Inject AuthService
    private router: Router  // ✅ Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  // Method to handle logout
  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);  // Redirect to the login page
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }
}
