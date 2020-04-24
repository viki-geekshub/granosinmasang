import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-add-stores',
  templateUrl: './add-stores.component.html',
  styleUrls: ['./add-stores.component.scss']
})
export class AddStoresComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getAll()
    .subscribe(
      res => this.storeService.setStores(res),
      error => console.log(error)
    );
  }

}
