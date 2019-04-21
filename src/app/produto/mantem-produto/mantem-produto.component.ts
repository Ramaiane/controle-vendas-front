import { Component, ViewChild } from "@angular/core";
import { Produto } from "../../model/Produto";
import { NgForm } from "@angular/forms";
import { BreadcrumbService } from "../../service/breadcrumb.service";
import { ProdutoService } from "../../service/produto.service";
import { ActivatedRoute } from "@angular/router";
import { CategoriaService } from "src/app/service/categoria.service";
import { Categoria } from "src/app/model/Categoria";
import { Message } from "primeng/api";
import { FornecedorService } from "src/app/service/fornecedor.service";
import { Fornecedor } from "src/app/model/Fornecedor";
import { Arquivo } from "src/app/model/Arquivo";
import { IServiceResponse } from "src/app/model/IResponse";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-mantem-produto',
    templateUrl: './mantem-produto.component.html'
})
export class MantemProdutoComponent {

    
    uploadUrl = '/controle-vendas-api/api/v1/produto/imagem' // URL de UPLOAD - utilizado no arquivo .html
    msgs: Message[];
    files: any[] = [];
    produto: Produto;
    optionsCategoria: Categoria[];
    optionsFornecedor: Fornecedor[];
    arquivo: any[];
    nomeArquivo: string;
    @ViewChild('produtoForm') produtoForm: NgForm;

    constructor( private breadcrumbService: BreadcrumbService,
        private produtoService: ProdutoService,
        private categoriaService: CategoriaService,
        private fornecedorService: FornecedorService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute){
            this.produto = new Produto();
            this.breadcrumbService.setItems([
            {label: 'Novo Produto', routerLink: 'mantemProduto'}
            ]);

    }

    ngOnInit(){
        if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarFornecedor') {
          this.route.params.subscribe(params => {
          //  this.produtoService.getLoja(params['id'])
          //    .then(res => this.produto = res.data);
          });
        } else {
          this.inicializarProduto();
        }

        this.carregaOptionsCategoria();
        this.carregaOptionsFornecedores();
      }
  
      carregaOptionsCategoria(){
        this.categoriaService.getCategorias().then( resp => {
          this.optionsCategoria = resp.data;
        });
      }

      carregaOptionsFornecedores(){
        this.fornecedorService.getFornecedores().then( resp =>{
          this.optionsFornecedor = resp.data;
        })
      }

      inicializarProduto() {
        this.produto = new Produto();
        this.files = [];
        this.nomeArquivo = null;

      }
  
      salvar(): void {
        if (this.produtoForm.invalid) {
          return;
        }
        this.produto.foto = this.nomeArquivo;
    
        
        if (this.produto.id) {
       //   this.produtoService.alterarLoja(this.loja);
        } else {
             this.produtoService.salvarProduto(this.produto).then(() => {
              this.produtoForm.reset();
              setTimeout(() => this.inicializarProduto(), 0);
             })
            
        } 
      }


      
  formataMoeda(element: any) {
    let valor = element.value.replace(/\D/g, '');
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    valor = valor.replace(/(\d)(\d{3}),/g, '$1.$2,');
    element.value = valor;
  }

  retiraMascaraFaturamento() {
    this.produto.preco = this.produto.preco ? this.acrescentaDecimal(this.produto.preco) : this.produto.preco;
  }

  
  acrescentaDecimal(numeroStr) {
    let numeroSemDecimal = numeroStr.substring(0, numeroStr.length - 2).replace(/[^0-9]+/g, '');
    const decimal = numeroStr.substring(numeroStr.length - 2, numeroStr.length);
    numeroSemDecimal += '.' + decimal;

    return parseFloat(numeroSemDecimal);
  }

  acrescentaMascaraMoeda(numero) {
    let valor = numero.toString().replace(/\D/g, '');
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    valor = valor.replace(/(\d)(\d{3}),/g, '$1.$2,');
    return valor;
  }

  onUpload(event) {
    debugger;

    for (const file of event.files) {
      this.files.push(file);
    }

    debugger
    const res = JSON.parse(event.xhr.response);
    this.nomeArquivo = res.data;

    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});

  }

  download(file: any) {
    this.produtoService.buscarImagem(file.name).then(resp => {
      debugger;
      file.arquivo = new Blob([resp]);
      const url = window.URL.createObjectURL(file.arquivo); 
      file.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file.arquivo)).toString();
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.dispatchEvent(new MouseEvent('click'));
    });

  }

}