import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SimpleTimer } from 'ng2-simple-timer';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //testData: Observable<any>;

  startStopButtonCaption: string = 'Start';
  timerValue: number = 0;
  countDownValue: number = 90;
  timerId1: string;
  clockString: string = "00:00:00";
  testStr: string = "...";
  firstTick: boolean = true;
  firstSerie: boolean = true;
  seriesCounter: number = 1;

  excercise1: string = "Chest: Dumbbell Fly";
  excercise2: string = "Chest: Barbell Bench Press";
  excercise3: string = "Back: Cable Seated Row";
  excercise4: string = "Back: Wide Grip Pulldown";
  excercise5: string = "Shoulders: Machine Shoulder Press";

  pause1: string = "90";
  pause2: string = "90";
  pause3: string = "90";
  pause4: string = "90";
  pause5: string = "90";

  weight1: string = "10";
  weight2: string = "10";
  weight3: string = "10";
  weight4: string = "10";
  weight5: string = "10";

  //users: any;
  testData: any;

  /**************************************/
    countries = [
       {id: 1, name: "United States"},
       {id: 2, name: "Australia"},
       {id: 3, name: "Canada"},
       {id: 4, name: "Brazil"},
       {id: 5, name: "England"}
     ];
    selectedValue = null;
  /**************************************/

  constructor(public navCtrl: NavController, private st: SimpleTimer, public httpClient: HttpClient, public restProvider: RestProvider) {
    this.st.newTimer('1sec',1);
    //this.getUsers();
    this.getTestData();
  }

  //getUsers() {
  //  this.restProvider.getUsers()
  //  .then(data => {
  //    this.users = data;
  //    console.log(this.users);
  //  });
  //}

  getTestData() {
    this.restProvider.getTestData()
    .then(data => {
      this.testData = data;
      console.log(this.testData);
      this.testStr = JSON.stringify(this.testData);
    });
  }

  excercises(): string[] {
    return [
      "Chest: Dumbbell Fly",
      "Chest: Barbell Bench Press",
      "Back: Cable Seated Row",
      "Back: Wide Grip Pulldown",
      "Shoulders: Machine Shoulder Press",
    ];
  }

  startStop(): void {
    if (!this.timerId1) {
    	console.log("start " + this.st.getTimer());
      this.startStopButtonCaption = 'Stop';
      this.timerId1 = this.st.subscribe('1sec', () => this.timerTick());
      console.log(this.st.getSubscription());

    } else {
      console.log("stop");
      this.startStopButtonCaption = 'Start';
      this.stopTimer();
    }
  }

  clearTimer(): void {
    this.timerValue = 0;
    this.clockString = "00:00:00";
    this.seriesCounter = 1;
    this.countDownValue = 0;
  }

  increaseSeriesCounter(): void {
    if (this.seriesCounter < 4) {
      this.seriesCounter++;
    } else {
      this.seriesCounter = 1;
    }
    this.countDownValue = 90;
    this.firstSerie = false;
  }

  stopTimer() {
    this.st.unsubscribe(this.timerId1);
    this.timerId1 = undefined; 
    this.firstTick = true;
  }

  logChosen(): void {
    console.log(this.excercise1,this.excercise2,this.excercise3,this.excercise4,this.excercise5);
  }

  timerTick() {
    console.log("new timerTick");
    if (!this.firstTick) {
      this.timerValue++;
      if (this.countDownValue > 0 && !this.firstSerie) {
        this.countDownValue--;
      }
    } else {
      this.firstTick = false;
    }
    this.clockString = this.getSecondsAsDigitalClock(this.timerValue);
  }

  getSecondsAsDigitalClock(sec_num: number) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
