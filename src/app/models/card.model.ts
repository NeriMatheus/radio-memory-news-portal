export interface Card {
    id: number;
    titulo: string;
    subtitulo: string;
    corpo: string;
    urlPost: string;
    imgUrl:  string;
    autor: string;
    status: number;
    data: string;
    categoria: string;
    videoUrl?: string;
    data_fixo?: string;
}