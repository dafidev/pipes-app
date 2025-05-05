import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Diego',
  gender: 'male',
  age: 39,
  addres: 'Ottawa, Canada',
};

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  addres: 'Madrid, Spain',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'to invite',
    female: 'invites',
  };

  changeClient() {
    if (this.client() == client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  //i18n Plural
  clientsMap = signal({
    '=0': 'there is any client waiting',
    '=1': 'there is 1 client waiting',
    '=2': 'there are 2 clients waiting',
    other: 'the are # clients waiting',
  });

  clients = signal<Array<string>>([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos',
  ]);

  deleteClient() {
    this.clients.update((p) => p.slice(1));
  }

  //KeyValuePipe
  profile = {
    name: 'Fernando',
    age: 36,
    address: 'Otawwa, Canada',
  };

  //Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject('Data error');
      resolve('Data in promise');
      console.log('Promise done');
    }, 3500);
  });

  // Observable Pipes
  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap', value))
  );
}
