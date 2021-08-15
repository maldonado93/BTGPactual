import { Injectable } from '@angular/core';
import { Pqr } from '../models/pqr.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PqrService {
  private urlEndPoint: string = 'http://localhost:8080/btg/listar';
  private urlEndPointcreate: string = 'http://localhost:8080/btg/guardar';
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getPqr(): Observable<Pqr[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Pqr[])
    );
  }


  createPqr(pqrObj: Pqr): Observable<Pqr> {
    return this.http.post<Pqr>(this.urlEndPointcreate, pqrObj, {headers: this.httpHeaders});
    // return this.http.post(this.urlEndPointcreate).pipe(
    //   map(response => response as Pqr[])
    // );
  }
  buscarPorIdPqr(id:String): Observable<Pqr> {
    const urlEndPointListarId: string = `http://localhost:8080/btg/listarPorId/${id}`;
    return this.http.get<Pqr>((urlEndPointListarId));
    // return this.http.post(this.urlEndPointcreate).pipe(
    //   map(response => response as Pqr[])
    // );
  }
}
