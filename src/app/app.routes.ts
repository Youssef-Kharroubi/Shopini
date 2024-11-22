import { Routes } from '@angular/router';
import {ProductDetailComponent} from './components/public/product-detail/product-detail.component';
import {ProductListComponent} from './components/public/product-list/product-list.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthGuard} from './guards/AuthGuard';
import {HomeComponent} from './components/public/home/home.component';
import { ContactusComponent } from './components/public/contactus/contactus.component';
import { ProductsManagementComponent } from './components/admin/products-management/products-management.component';
import { AboutusComponent } from './components/public/aboutus/aboutus.component';
import {AdminGuard} from './guards/adminGuard';
import { UsersManagementComponent } from './components/admin/users-management/users-management.component';
import {HomeAdminComponent} from './components/admin/home-admin/home-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id/:source', component: ProductDetailComponent },
  { path: 'productManagement',  component: ProductsManagementComponent, canActivate: [AdminGuard]},
  { path: 'usersManagement',  component: UsersManagementComponent, canActivate: [AdminGuard]},
  { path: 'HomeAdmin', component: HomeAdminComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'products' }
];
