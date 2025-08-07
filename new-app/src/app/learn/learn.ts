import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface LearningTopic {
  title: string;
  description: string;
  exampleCode: string;
  explanation: string[];
  exercise: string;
  solution: string;
}

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learn.html',
  styleUrl: './learn.css'
})
export class Learn implements OnInit {
  currentTopic!: LearningTopic;
  showSolutionFlag = false;
  learningTopics: { [key: string]: LearningTopic } = {};
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLearningTopics();
  }

  loadLearningTopics() {
    console.log('Loading learning topics...');
    this.http.get<{ [key: string]: LearningTopic }>('assets/learning-topics.json')
      .subscribe({
        next: (data) => {
          console.log('Data loaded successfully:', data);
          this.learningTopics = data;
          if (data['components']) {
            this.currentTopic = data['components'];
          } else {
            console.error('Components topic not found in data');
            this.errorMessage = 'Learning content not found';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading learning topics:', error);
          this.errorMessage = 'Failed to load learning content. Please try again.';
          this.isLoading = false;
        }
      });
  }

  selectTopic(topicKey: string, event: Event) {
    event.preventDefault();

    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    (event.target as HTMLElement).closest('.nav-item')?.classList.add('active');

    // Update current topic
    this.currentTopic = this.learningTopics[topicKey as keyof typeof this.learningTopics];
    this.showSolutionFlag = false;
  }

  showSolution() {
    this.showSolutionFlag = !this.showSolutionFlag;
  }
}
