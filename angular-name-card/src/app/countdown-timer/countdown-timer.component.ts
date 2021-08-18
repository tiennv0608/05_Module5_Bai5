import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnChanges, OnDestroy {
  message = '';
  remaining: number;
  @Input() seconds = 60;
  @Output() finish = new EventEmitter<boolean>();
  private intervalId = 0;

  constructor() {
  }

  ngOnInit() {
    this.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 60 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 60 : vFixed;
    }
  }

  clearTime() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    this.clearTime();
  }

  start() {
    this.countDown();
    if (this.remaining <= 0) {
      this.remaining = this.seconds;
    }
  }

  stop() {
    this.clearTime();
    this.message = `Holding at T-${this.remaining} seconds`;
  }

  reset() {
    this.clearTime();
    this.remaining = this.seconds;
    this.message = 'Click start button to Countdown';
  }

  private countDown() {
    this.clearTime();
    this.intervalId = window.setInterval(() => {
      this.remaining -= 1;
      if (this.remaining === 0) {
        this.message = 'Blast off';
        this.clearTime();
        this.finish.emit(true);
      } else {
        this.message = `T-${this.remaining} seconds and counting`;
      }
    }, 1000);
  }

}
