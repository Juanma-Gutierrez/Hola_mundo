import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {
    @Input() usuario?:User | null

  constructor() {}

  ngOnInit() {}
}
