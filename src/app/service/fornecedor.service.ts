import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Fornecedor } from "../model/Fornecedor";
import { IServiceResponse } from "../model/IResponse";
import { IPage } from "../model/IPage";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {
    constructor(private http: HttpClient){ }

    salvarFornecedor(fornecedor: Fornecedor){
        return this.http.post<IServiceResponse<Fornecedor>>('/controle-vendas-api/api/v1/fornecedor', fornecedor)
        .toPromise();
    }

    alterarFornecedor(fornecedor: Fornecedor) {
        return this.http.put<IServiceResponse<Fornecedor>>(`/controle-vendas-api/api/v1/fornecedor/${fornecedor.id}`, fornecedor)
          .toPromise();
    }

    excluirFornecedor(id) {
        return this.http.delete<IServiceResponse<any>>(`/controle-vendas-api/api/v1/fornecedor/${id}`)
          .toPromise();
    }
    
    getFornecedorPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Fornecedor>>>('/controle-vendas-api/api/v1/fornecedor/fornecedorPaginado' , options)
        .toPromise();
    }

    getFornecedores(){
        return this.http.get<IServiceResponse<Fornecedor[]>>('/controle-vendas-api/api/v1/fornecedor')
        .toPromise();
    }
    
    getForncedorById(id: string) {
        return this.http.get<IServiceResponse<Fornecedor>>(`/controle-vendas-api/api/v1/fornecedor/${id}`)
          .toPromise();
      }
}