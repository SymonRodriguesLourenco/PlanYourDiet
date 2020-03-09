import {Component, OnInit} from '@angular/core';
import { User } from '../_models/user';
import {CurrentUser} from '../_models/currentUser';
import { UserService } from '../_services/user.service';
import { style } from '@angular/animations';
import { first } from 'rxjs/operators';


export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}


@Component({
    selector: 'personal-page',
    templateUrl: 'personal-page.component.html',
    styleUrls: ['personal-page.component.css'],
    host: {'class' : 'personalPageStyle'}
})


export class PersonalPageComponent implements OnInit {


    constructor(private userService: UserService)
    {}

    

    currentUser : CurrentUser = {
        firstName: '',
        lastName: '',
        birthday: '',
        currentWeight: '',
        goalWeight: '',
        email: '',
        token: ''
    };

    users = []

    tiles: Tile[] = [
        {text: 'this.currentUser.firstName + this.currentUser.lastName', cols: 3, rows: 2, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      ];


    ngOnInit() {
        this.loadUserInfo();
    }

    private loadUserInfo() {
        this.userService.getUserInfo()
        .pipe()
        .subscribe(what =>  this.currentUser = what);
    }
} 
