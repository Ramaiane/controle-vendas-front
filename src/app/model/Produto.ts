import { Categoria } from "./Categoria";
import { Fornecedor } from "./Fornecedor";

export class Produto {
    id: number;
    nome: string;
    ativo: boolean;
    cor: string;
    medidas: string;
    quantidade: number;
    modelo: string;
    descricao: string;
    preco: number;
    foto: string;
    categoria: Categoria;
    fornecedor: Fornecedor;
}