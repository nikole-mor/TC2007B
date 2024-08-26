// src/dataProvider.ts
import { fetchUtils, DataProvider, CreateResult, DeleteManyParams, DeleteManyResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult } from 'react-admin';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length,
    }));
  },
  getOne: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },
  create: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })) as Promise<CreateResult<any>>;
  },
  update: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
  delete: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }));
  },
  getMany: function <RecordType extends RaRecord = any>(resource: string, params: GetManyParams<RecordType> & QueryFunctionContext): Promise<GetManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  getManyReference: function <RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams & QueryFunctionContext): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  updateMany: function <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams): Promise<UpdateManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  },
  deleteMany: function <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
    throw new Error('Function not implemented.');
  }
};

export default dataProvider;