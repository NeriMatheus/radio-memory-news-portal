// Interface que define a estrutura de um post/card do portal de notícias
export interface Card {
    id: number;
    titulo: string;
    subtitulo: string;
    corpo: string;
    urlPost: string;
    imgUrl: string;
    autor: string;
    status: number; // 1 para ativo, 0 para inativo
    data: string;
    categoria: string;
    videoUrl?: string;   
    data_fixo?: string;  
}