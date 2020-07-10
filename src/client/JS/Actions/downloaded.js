import { createAction } from '@reduxjs/toolkit'

export const request = createAction('FETCH_DLED_REQUEST')
export const success = createAction('FETCH_DLED_SUCCESS')
export const failed = createAction('FETCH_DLED_FAILED')
