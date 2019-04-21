import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { ListaLojaComponent } from './loja/lista-loja/lista-loja.component';
import { UtilityService } from './service/utility/utility.service';
import { MenuComponent, AppSubMenuComponent } from './layout/menu/menu.component';
import { TopBarComponent } from './layout/topBar/topbar.component';
import { BreadCrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { RodapeComponent } from './layout/rodape/rodape.component';
import { RouterModule } from '@angular/router';
import { ScrollPanelModule, InputTextModule, ButtonModule, CheckboxModule, PaginatorModule, TabMenuModule, CardModule, MessagesModule, MessageModule, BreadcrumbModule, ConfirmDialogModule, DropdownModule, ListboxModule, FieldsetModule, MultiSelectModule, PanelMenuModule, PanelModule, InputMaskModule, CalendarModule, DialogModule, InputTextareaModule, MenubarModule, ConfirmationService, GrowlModule, MessageService, FileUploadModule, TabViewModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { BreadcrumbService } from './service/breadcrumb.service';
import { MantemLojaComponent } from './loja/mantem-loja/mantem-loja.component';
import { HTTPListener } from './service/RxJS/HTTPListener.service';
import { HTTPStatus } from './service/RxJS/HTTPStatus.service';
import { MantemFornecedorComponent } from './fornecedor/mantem-fornecedor/mantem-fornecedor.component';
import { ListaFornecedorComponent } from './fornecedor/lista-fornecedor/lista-fornecedor.component';
import { ListaCategoriaComponent } from './categoria/lista-categoria/lista-categoria.component';
import { MantemCategoriaComponent } from './categoria/mantem-categoria/mantem-categoria.component';
import { MantemProdutoComponent } from './produto/mantem-produto/mantem-produto.component';
import { VendasComponent } from './produto/vendas/vendas.component';
import {DataViewModule} from 'primeng/dataview';

const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    ListaLojaComponent,
    MenuComponent,
    AppSubMenuComponent,
    TopBarComponent,
    BreadCrumbComponent,
    RodapeComponent,
    MantemLojaComponent,
    MantemFornecedorComponent,
    ListaFornecedorComponent,
    ListaCategoriaComponent,
    MantemCategoriaComponent,
    MantemProdutoComponent,
    VendasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,

    // primeng
    ScrollPanelModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    PaginatorModule,
    TabMenuModule,
    CardModule,
    MessagesModule,
    MessageModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    FieldsetModule,
    MultiSelectModule,
    PanelMenuModule,
    PanelModule,
    InputMaskModule,
    CalendarModule,
    DialogModule,
    InputTextareaModule,
    MenubarModule, 
    TableModule,
    GrowlModule,
    LoadingModule,
    FileUploadModule,
    TabViewModule,
    DataViewModule
    

  ],
  providers: [
    ...RxJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    },
    MessageService,
    AuthenticationService,
    UtilityService,
    BreadcrumbService,
    MenuComponent,
    AppSubMenuComponent,
    ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
