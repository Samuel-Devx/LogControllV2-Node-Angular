import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLog } from "./home/home-log/home-log";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeLog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-angular');
}
