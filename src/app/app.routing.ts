import { RouterModule, Routes } from '@angular/router';
import { ListaLojaComponent } from './loja/lista-loja/lista-loja.component';
import { MantemLojaComponent } from './loja/mantem-loja/mantem-loja.component';
import { MantemFornecedorComponent } from './fornecedor/mantem-fornecedor/mantem-fornecedor.component';
import { ListaFornecedorComponent } from './fornecedor/lista-fornecedor/lista-fornecedor.component';
import { ListaCategoriaComponent } from './categoria/lista-categoria/lista-categoria.component';
import { MantemCategoriaComponent } from './categoria/mantem-categoria/mantem-categoria.component';
import { MantemProdutoComponent } from './produto/mantem-produto/mantem-produto.component';
import { VendasComponent } from './produto/vendas/vendas.component';

const routes: Routes = [
  { path: 'lojas', component: ListaLojaComponent },
  {path : 'mantemLoja', component : MantemLojaComponent},
  { path: 'editarloja/:id', component: MantemLojaComponent },
  { path: 'mantemFornecedor', component: MantemFornecedorComponent },
  { path: 'fornecedores', component: ListaFornecedorComponent },
  { path: 'editarFornecedor/:id', component: MantemLojaComponent },
  { path: 'categorias', component: ListaCategoriaComponent },
  { path: 'mantemCategorias', component: MantemCategoriaComponent },
  { path: 'editarCategorias/:id', component: MantemCategoriaComponent },
  { path: 'mantemProduto', component: MantemProdutoComponent },
  { path: 'vendasProduto', component: VendasComponent },
  {path : '', component : ListaLojaComponent}
];

export const routing = RouterModule.forRoot(routes);
