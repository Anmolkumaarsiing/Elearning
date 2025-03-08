import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  // Import RouterModule and Router
import { QuizService } from '../../services/quiz.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Import RouterModule here
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: any[] = [];
  selectedAnswers: string[] = [];
  showResults: boolean = false;
  correctAnswersCount: number = 0;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router  // Inject Router here
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(data => {
      this.quizzes = this.getRandomQuestions(data, 10);
      this.selectedAnswers = new Array(this.quizzes.length).fill(null);
    });
  }

  /** ✅ Function to Pick 10 Random Questions */
  getRandomQuestions(allQuestions: any[], count: number): any[] {
    let shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  selectAnswer(index: number, option: string): void {
    this.selectedAnswers[index] = option;
  }

  submitQuiz(): void {
    this.correctAnswersCount = this.selectedAnswers.filter((answer, index) => 
      answer === this.quizzes[index].correct_answer
    ).length;
    this.showResults = true;
  }

  restartQuiz(): void {
    this.showResults = false;
    this.ngOnInit(); // ✅ Restart by fetching new random questions
  }

  isCorrectAnswer(index: number, option: string): boolean {
    return this.showResults && option === this.quizzes[index].correct_answer;
  }

  isIncorrectAnswer(index: number, option: string): boolean {
    return this.showResults && option !== this.quizzes[index].correct_answer && this.selectedAnswers[index] === option;
  }

  // Logout method
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // After logging out, navigate to the login page
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
