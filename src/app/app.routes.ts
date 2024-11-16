import { Routes } from '@angular/router';
import {ProductDetailComponent} from './components/public/product-detail/product-detail.component';
import {ProductListComponent} from './components/public/product-list/product-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthGuard} from './guards/AuthGuard';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {HomeComponent} from './components/public/home/home.component';
import { ContactusComponent } from './components/public/contactus/contactus.component';


export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  // {
  //   path: 'admin',
  //   canActivate: [AuthGuard],
  //   data: { requiresAdmin: true },
  //   // children: [
  //   //   { path: '', component: AdminDashboardComponent },
  //   //   { path: 'products/new', component: ProductFormComponent },
  //   //   { path: 'products/edit/:id', component: ProductFormComponent }
  //   // ]
  // },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'products' }
];
