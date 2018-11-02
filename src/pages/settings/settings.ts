import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the AdduserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  //settingsStr: string = '';
  settingsStr: any;
  settings = { name:'', exerciseCount:'', pauseInSec:'', repeatsInSet:'' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
    this.getSettings();
  }

  getSettings() {
    this.restProvider.settings("").then((result:any) => {
      this.settingsStr = result.result;
      console.log(this.settingsStr);
  
      this.settings = JSON.parse(this.settingsStr);
      console.log(this.settings);

    }, (err) => {
      console.log(err);
    });
  }

  saveSettings() {
    console.log("saveSettings: "  + JSON.stringify(this.settings));
    this.restProvider.saveSettings(this.settings).then((result:any) => {
      this.settingsStr = result.result;
      console.log(this.settingsStr);
  
      //this.settings = JSON.parse(this.settingsStr);
      //console.log(this.settings);

    }, (err) => {
      console.log(err);
    });
  }
}
