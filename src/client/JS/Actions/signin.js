import { createAction } from '@reduxjs/toolkit'

export const request = createAction('SIGN_IN_REQUEST')
export const success = createAction('SIGN_IN_SUCCESS')
export const failed = createAction('SIGN_IN_FAILED')
