import RequestService from "../../utils/request-service";
import {tableLoading, tableLoadingFailure, tableLoadingSucess} from "../slices/app";
import {setPaginationData} from "../slices/pagination";
import {createInvoiceFailure, invoicesGetSuccess} from "../slices/invoices";


export const getInvoices = (searchParams) => async (dispatch) => {
    dispatch(tableLoading())
    const url = `/invoices${searchParams}`
    try {
        const response = await RequestService.get(url)
        let {data, ...pagination} = response.data
        dispatch(invoicesGetSuccess(data))
        dispatch(setPaginationData(pagination))
        dispatch(tableLoadingSucess())
    } catch (error) {
        dispatch(tableLoadingFailure())
        throw error.response
    }
}

export const getInvoiceItem = (id) => async (dispatch) => {
    dispatch(tableLoading())
    const url = `/invoices/${id}`
    try {
        const response = await RequestService.get(url)
        dispatch(tableLoadingSucess())
        return response.data
    } catch (error) {
        dispatch(tableLoadingFailure())
        throw error.response
    }
}

export const createInvoice = (invoice) => async (dispatch) => {
    dispatch(tableLoading())
    try {
        await RequestService.post("/invoices", invoice)
        dispatch(tableLoadingSucess())
    } catch (error) {
        dispatch(tableLoadingFailure())
        dispatch(createInvoiceFailure(error.response.data))
        throw error.response
    }
}


export const deleteInvoice = (id) => async (dispatch) => {
    dispatch(tableLoading())
    try {
        await RequestService.delete(`/invoices/${id}`)
        dispatch(tableLoadingSucess())
    } catch (error) {
        dispatch(tableLoadingFailure())
        throw error.response
    }
}

