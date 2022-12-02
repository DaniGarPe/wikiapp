import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pluck } from "rxjs";
import { environment } from "src/environments/environment";

interface WikipediaResponse {
    query: {
        search: Article[]
    }
}

export interface Article {
    ns: number;
    title: string;
    pageid: number;
    size: number;
    wordcount: number;
    snippet: string;
    timestamp: Date;
}

@Injectable({providedIn: 'root'})
export class SearchService {
    constructor( private readonly http: HttpClient) {

    }

    search( term: string ):Observable<Article[]> {
        // https://en.wikipedia.org/w/api.php -> environment.ts/api
        // ?action=query&format=json&list=search&formatversion=2&srsearch=angular

        const params = {
            action: 'query',
            format: 'json',
            list:'search',
            srsearch: term,
            utf8: '1',
            srlimit: 10,
            origin: '*'
        }

        return this.http.get<WikipediaResponse>(environment.api, { params })
        .pipe(
            pluck('query', 'search')
        );

    }
}