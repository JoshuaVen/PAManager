import { createAction } from '@reduxjs/toolkit'

export const request = createAction('FETCH_DLED_REQUEST')
export const success = createAction('FETCH_DLED_SUCCESS')
export const failed = createAction('FETCH_DLED_FAILED')

export const search_req = createAction('SEARCH_REQ')
export const search_rec = createAction('SEARCH_REC')
export const search_err = createAction('SEARCH_ERR')
