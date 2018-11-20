import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SimpleTimer } from 'ng2-simple-timer';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  startStopButtonCaption: string = 'Start';
  timerValue: number = 0;
  countDownValue: number = 0;
  timerId1: string;
  clockString: string = "00:00:00";
  testStr: string = "...";
  testStr2: string = "...";
  settingsString: string = '';
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

  //testData: any;
  //testData2: any;
  settingsData: any;

  settingsStr: any;
  settings = { name:'', exerciseCount:'', setCount:'', pauseInSec:'', repeatsInSet:'' };

  exercisesStr: any;
  exercises = { createdAt:'', updatedAt:'', name:'', order:'', exerciseId:'', targetArea:'',
                pauseInSec:'', setCount:'', repeatsInSet:'', objectId:'' };

  training1 = { exercise:'', pauseInSec:'', weightInKg:'', setCount:'', repeatsInSet:'' };
  training2 = { exercise:'', pauseInSec:'', weightInKg:'', setCount:'', repeatsInSet:'' };
  training3 = { exercise:'', pauseInSec:'', weightInKg:'', setCount:'', repeatsInSet:'' };
  training4 = { exercise:'', pauseInSec:'', weightInKg:'', setCount:'', repeatsInSet:'' };
  training5 = { exercise:'', pauseInSec:'', weightInKg:'', setCount:'', repeatsInSet:'' };

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

  constructor(public navCtrl: NavController, private st: SimpleTimer, public httpClient: HttpClient,
              public restProvider: RestProvider) {
    console.log('>> home.constructor');
    this.st.newTimer('1sec',1);
    this.getSettings();
    this.getExercises();
  }

  ionViewDidLoad() {
    console.log('>> home.ionViewDidLoad');
    //this.activateSettings();
  }

  ionViewWillEnter() {
    console.log('>> home.ionViewWillEnter');
    this.getSettings();
  }

  getSettings() {
    //var currentdate = new Date().toLocaleString();
    //console.log('>> current date time: ' + currentdate);
    console.log('>> home.getSettings');

    /*var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
    console.log('>> current date time: ' + datetime);

    var trainingTime =  currentdate.getFullYear() + '-' +
                        (currentdate.getMonth()+1) + '-' +
                        currentdate.getDate() + 'T' +
                        currentdate.getHours() + ':' +
                        currentdate.getMinutes();*/

    this.restProvider.settings("").then((result:any) => {
      this.settingsStr = result.result;
      console.log(this.settingsStr);
      this.settings = JSON.parse(this.settingsStr);
      this.activateSettings();
      console.log(this.settings);
    }, (err) => {
      console.log(err);
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
    this.countDownValue = parseInt(this.pause1);
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

  goSettingsPage() {
    console.log('>> home.goSettingsPage');
    this.navCtrl.push('SettingsPage', {});
  }

  activateSettings() {
    console.log('>> home.activateSettings');
    this.pause1 = this.settings.pauseInSec;
    this.pause2 = this.settings.pauseInSec;
    this.pause3 = this.settings.pauseInSec;
    this.pause4 = this.settings.pauseInSec;
    this.pause5 = this.settings.pauseInSec;
    //this.countDownValue = parseInt(this.pause1);
  }

  saveTraining() {
    console.log('>> home.saveTraining ' + JSON.stringify(this.training));

    var currentdate = new Date();
    var trainingTime =  currentdate.getFullYear() + '-' +
                        (currentdate.getMonth()+1) + '-' +
                        currentdate.getDate() + 'T' +
                        currentdate.getHours() + ':' +
                        currentdate.getMinutes() + ':' +
                        currentdate.getSeconds() + '.000Z';
    console.log('>> training time: ' + trainingTime);
    //this.training1.date = trainingTime;

    this.training1.date = currentdate;
    this.training1.exercise = this.exercises[0].objectId;
    this.training1.pauseInSec = this.pause1;
    this.training1.weightInKg = this.weight1;
    this.training1.setCount = this.settings.setCount;
    this.training1.repeatsInSet = this.settings.repeatsInSet;
    this.restProvider.saveTraining(this.training1).then((result:any) => {
      console.log(">> training saved");
    }, (err) => {
      console.log(err);
    });

    this.training2.date = currentdate;
    this.training2.exercise = this.exercises[1].objectId;
    this.training2.pauseInSec = this.pause2;
    this.training2.weightInKg = this.weight2;
    this.training2.setCount = this.settings.setCount;
    this.training2.repeatsInSet = this.settings.repeatsInSet;
    this.restProvider.saveTraining(this.training2).then((result:any) => {
      console.log(">> training saved");
    }, (err) => {
      console.log(err);
    });

    this.training3.date = currentdate;
    this.training3.exercise = this.exercises[2].objectId;
    this.training3.pauseInSec = this.pause3;
    this.training3.weightInKg = this.weight3;
    this.training3.setCount = this.settings.setCount;
    this.training3.repeatsInSet = this.settings.repeatsInSet;
    this.restProvider.saveTraining(this.training3).then((result:any) => {
      console.log(">> training saved");
    }, (err) => {
      console.log(err);
    });

    this.training4.date = currentdate;
    this.training4.exercise = this.exercises[3].objectId;
    this.training4.pauseInSec = this.pause4;
    this.training4.weightInKg = this.weight4;
    this.training4.setCount = this.settings.setCount;
    this.training4.repeatsInSet = this.settings.repeatsInSet;
    this.restProvider.saveTraining(this.training4).then((result:any) => {
      console.log(">> training saved");
    }, (err) => {
      console.log(err);
    });

    this.training5.date = currentdate;
    this.training5.exercise = this.exercises[4].objectId;
    this.training5.pauseInSec = this.pause5;
    this.training5.weightInKg = this.weight5;
    this.training5.setCount = this.settings.setCount;
    this.training5.repeatsInSet = this.settings.repeatsInSet;
    this.restProvider.saveTraining(this.training5).then((result:any) => {
      console.log(">> training saved");
    }, (err) => {
      console.log(err);
    });
  }

  getExercises() {
    console.log('>> home.getExercises');
    this.restProvider.exercises("").then((result:any) => {
      this.exercisesStr = result.result;
      console.log(">> exercises as string: " + this.exercisesStr);
      this.exercises = JSON.parse(this.exercisesStr);
      //console.log(">> exercises as object: " + this.exercises);

      //for (var i = 0; i < result.result.length; i++) { // Android
      for (var i = 0; i < this.exercises.length; i++) {
        console.log(">> exercise: " + this.exercises[i].name);
        if (this.exercises[i].order == 0 ) {
          this.excercise1 = this.exercises[i].targetArea + ': ' + this.exercises[i].name;
          this.weight1 = this.exercises[i].weightInKg.toString();
          console.log('>> objectId: ' + this.exercises[i].objectId);
        } else if (this.exercises[i].order == 1 ) {
          this.excercise2 = this.exercises[i].targetArea + ': ' + this.exercises[i].name;
          this.weight2 = this.exercises[i].weightInKg.toString();
          console.log('>> objectId: ' + this.exercises[i].objectId);
        } else if (this.exercises[i].order == 2 ) {
          this.excercise3 = this.exercises[i].targetArea + ': ' + this.exercises[i].name;
          this.weight3 = this.exercises[i].weightInKg.toString();
          console.log('>> objectId: ' + this.exercises[i].objectId);
        } else if (this.exercises[i].order == 3 ) {
          this.excercise4 = this.exercises[i].targetArea + ': ' + this.exercises[i].name;
          this.weight4 = this.exercises[i].weightInKg.toString();
          console.log('>> objectId: ' + this.exercises[i].objectId);
        } else if (this.exercises[i].order == 4 ) {
          this.excercise5 = this.exercises[i].targetArea + ': ' + this.exercises[i].name;
          this.weight5 = this.exercises[i].weightInKg.toString();
          console.log('>> objectId: ' + this.exercises[i].objectId);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
}
