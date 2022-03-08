import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/service/products.service';
import { SdbPopupComponent } from '../../components/sdb-popup/sdb-popup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listBitcoinForFront: Product[] = [];

  displayedColumns: string[] = ['numero', 'simbolo', 'Nombre', 'tasa', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private productService: ProductsService,
               private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBitcoin();
  }

  loadBitcoin(){
    this.listBitcoinForFront = this.productService.getBitcoinForFront();
    this.dataSource = new MatTableDataSource(this.listBitcoinForFront)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBitcoin(index: number) {
    this.productService.deleteBitcoinForFront(index);
    this.loadBitcoin();
  }

  openDialog() {
    const dialogRef = this.dialog.open(SdbPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loadBitcoin();
      }
    });
  }

}
