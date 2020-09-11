import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public totalOrder:string='';
  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll()
    .subscribe(
      res => this.orderService.setOrders(res),
      error => console.log(error)
    );
    this.totalOrder=localStorage.getItem('total')
  }

}
