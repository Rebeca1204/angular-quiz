import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quiz_questions from '../../../assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.question = this.questions[this.index];
      this.maxIndex = this.questions.length;
    }
  }

  buttonPress(value: string) {
    this.answers.push(value);
    this.nextQuestion();
  }

  async nextQuestion() {
    this.index++;

    if (this.maxIndex > this.index) {
      this.question = this.questions[this.index];
    } else {
      this.finished = true;
      this.answer =
        quiz_questions.results[
          (await this.checkResults()) as keyof typeof quiz_questions.results
        ];
    }
  }

  async checkResults() {
    const result = this.answers.reduce((previous, current, index, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      }
      return current;
    });

    return result;
  }

  title: string = '';

  questions: any;
  question: any;

  answers: string[] = [];
  answer: string = '';

  index: number = 0;
  maxIndex: number = 0;

  finished: boolean = false;
}
