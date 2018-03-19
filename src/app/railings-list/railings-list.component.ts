import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-railings-list',
  templateUrl: './railings-list.component.html',
  styleUrls: ['./railings-list.component.css']
})
export class RailingsListComponent implements OnInit {

  storedRailingsURL = './assets/formas.json';
  railingCodes = [];

  constructor(private httpClient: HttpClient) {
    // Load pre-existing railing codes from a JSON file
    this.httpClient.get(this.storedRailingsURL)
      .subscribe((data:RailingsJson) => this.railingCodes = data.formas);
  }

  ngOnInit() {
  }

  /**
   * Adds new railing code _at the beginning_ of the railings list.
   */
  addRailingCode() {
    this.railingCodes.unshift('Write here the new railing code');
  }
}
