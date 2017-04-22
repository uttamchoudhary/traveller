/* tslint:disable:no-unused-variable member-ordering */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, Request, RequestOptionsArgs, RequestMethod, URLSearchParams } from '@angular/http';
import * as Rx from 'rxjs';

import { Error } from './Error';
import { HttpHelper } from './HttpHelper';
import { IApi } from './IApi';

'use strict';

@Injectable()
export abstract class BaseApi<T> implements IApi<T> {
  keyName = 'id';
  _resourceName = 'resource';

  protected _basePath = 'http://localhost:2000/odata';
  public _defaultHeaders: Headers = new Headers({});

  constructor(protected _http: Http) {
    this._defaultHeaders.append('Access-Control-Allow-Origin', '*');
  }

  protected extendObj<T1, T2>(objA: T1, objB: T2): T1 & T2 {
    for (let key in objB) {
      if (objB.hasOwnProperty(key)) {
        (<T1 & T2>objA)[key] = (<T1 & T2>objB)[key];
      }
    }
    return <T1 & T2>objA;
  }

  /**
   * Get EntitySet Addresses
   * Returns the EntitySet Addresses
   * @param $Expand Expand navigation property
   * @param $Filter filter property
   * @param $Select select structural property
   * @param $Orderby order by some property
   * @param $Top top elements
   * @param $Skip skip elements
   * @param $Count include count in response
   */
  public get(expand?: string, filter?: string, select?: string, orderBy?: string, top?: number, skip?: number, count?: boolean,
    keywords?: string,
    extraHttpRequestParams?: any): Rx.Observable<{ count: number, list: T[] }> {
    let oData = HttpHelper.createOData(select, orderBy, expand, filter, top, skip, count);
    let urlSearchParams = HttpHelper.createUrlSearchParamsFromOData(oData);

    const path = `${this._basePath}/${this._resourceName}`;

    let headerParams: any = this.extendObj({}, this._defaultHeaders);

    let options = new RequestOptions({
      method: RequestMethod.Get,
      url: path,
      headers: headerParams,
      search: urlSearchParams
    });

    let req = new Request(options);

    return this._http.request(req)
      .map(
      (res: Response) => {
        let listWithCount = {
          count: res.json()['@odata.count'],
          list: res.json().value
        };
        this.changeDateStringToDateObject(listWithCount.list);
        return listWithCount;
      }
      )
      .catch(this.handleError);
  }

  protected changeDateStringToDateObject(list) {
    list.forEach(item => {
      item.ModifiedDate = new Date(item.ModifiedDate);
    });
  }

  protected handleError(error: Response) {
    console.error(error);
    return Rx.Observable.throw(error.json().error || 'Server error');
  }

  public post(item?: T): Rx.Observable<any> {
    const path = `${this._basePath}/${this._resourceName}`;
    let headerParams: any = this.extendObj({}, this._defaultHeaders);
    let options = new RequestOptions({
      method: RequestMethod.Post,
      url: path,
      headers: headerParams,
      body: JSON.stringify(item)
    });

    let req = new Request(options);
    return this._http.request(req);
  }

  public getById(id: number, select?: string): Rx.Observable<any> {
    const path = `${this._basePath}/${this._resourceName}(${id})`;
    let headerParams: any = this.extendObj({}, this._defaultHeaders);
    if (!id) {
      throw new Error(`Missing required parameter "${this.keyName}" when calling getById.`);
    }

    let oData = HttpHelper.createOData(select, null, null, null, null, null, null);
    let urlSearchParams = HttpHelper.createUrlSearchParamsFromOData(oData);

    let options = new RequestOptions({
      method: RequestMethod.Get,
      url: path,
      search: urlSearchParams,
      headers: headerParams
    });

    let req = new Request(options);

    return this._http.request(req);
  }

  public getNewId() {
    return 0;
  }

  public delete(id: number, ifMatch?: string): Rx.Observable<{}> {
    const path = `${this._basePath}/${this._resourceName}(${id})`;
    let headerParams: any = this.extendObj({}, this._defaultHeaders);
    // verify required parameter 'addressId' is set
    if (!id) {
      throw new Error('Missing required parameter "id" when calling delete.');
    }

    headerParams['If-Match'] = ifMatch;

    let options = new RequestOptions({
      method: RequestMethod.Delete,
      url: path,
      headers: headerParams
    });

    let req = new Request(options);

    return this._http.request(req);
  }

  public patch(id: number, item?: T, extraHttpRequestParams?: any): Rx.Observable<any> {
    const path = `${this._basePath}/${this._resourceName}(${id})`;

    let headerParams: any = this.extendObj({}, this._defaultHeaders);

    if (!id) {
      throw new Error(`Missing required parameter "${this.keyName}" when calling patch`);
    }

    let options = new RequestOptions({
      method: RequestMethod.Patch,
      url: path,
      headers: headerParams,
      body: JSON.stringify(item)
    });

    let req = new Request(options);

    return this._http.request(req);
  }

  public save(item?: T, isEdited: boolean = true, extraHttpRequestParams?: any): Rx.Observable<T> {
    console.log('BaseApi Save');
    if (item[this.keyName] !== null) {
      return this.patch(item[this.keyName], item);
    } else {
      return this.post(item);
    }
  }
}
