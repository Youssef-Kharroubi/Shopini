import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,

} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {Customer as User} from '../../../models/customer';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from '../../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddUserComponent} from './add-user/add-user.component';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    MatFormField,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatButton,
    MatColumnDef,
    MatInputModule,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  nameFilter: string= '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('nameInput') nameInput!: ElementRef;

  user: User;
constructor(private userService: UserService,private dialog: MatDialog) {
  this.user= {} as User;
}
  ngOnInit() {
  this.loadUsers();
  this.dataSource.filterPredicate = (data: User,filter: string)=>{
    return data.username.trim().toLowerCase().includes(filter);
    }
  }
  loadUsers(){
  this.userService.getUsers().subscribe(users=>{
    this.dataSource.data = users;
    this.dataSource.paginator = this.paginator;
  })
  }
  applyNameFilter(event: any){
  const inputValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = inputValue.trim().toLowerCase();
  }
  clearFilters(){
  this.nameFilter='';
  this.dataSource.filter = '';
  this.nameInput.nativeElement.value = '';
  }
  onUpdate(user: User){
  const dialogRef = this.dialog.open(UpdateUserComponent, {
    width: '400px',
    data: user
  });
  dialogRef.afterClosed().subscribe((updatedUser)=>{
    if(updatedUser){
      this.userService.updateUser(updatedUser).subscribe(()=>this.loadUsers());
    }
  })
  }
  onAddUser(){
  const dialogRef = this.dialog.open(AddUserComponent,{
    width: '400px',
  });
  dialogRef.afterClosed().subscribe((newUser)=>{
    if(newUser){
      this.userService.addUser(newUser).subscribe(()=>this.loadUsers());
    }
  })
  }
  onDelete(user: User){
  if(confirm('Are you sure you want to delete this product?')){
    this.userService.deleteUser(user).subscribe(()=>this.loadUsers());
  }
  }

}
