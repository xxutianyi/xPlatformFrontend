import { PaginationData, PaginationProps, ResponseStructure } from "@/services/_Foundation/_typings";
import { request } from "@@/exports";
import { Model } from "@/services/_Foundation/_Model";

export async function auditsIndex(param: PaginationProps) {
  return request<ResponseStructure<PaginationData<Model.Audit>>>(
    '/api/audits',
    {
      method: 'GET',
      params: param,
    },
  );
}