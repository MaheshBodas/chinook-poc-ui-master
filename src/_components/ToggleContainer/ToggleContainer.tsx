import React, { Component, ReactChild } from 'react'
import { LoaderComponent } from './../LoaderComponent/LoaderComponent'
import { Notification } from 'element-react';
// import { Alert } from 'reactstrap';
import {
  Alert
} from '@material-ui/core';
import './card.css'

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
// type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

type Props = {
  children: ReactChild | NamedChildrenSlots,
  shouldDisplayMain: boolean,
  loading: boolean,
  showSuccess: boolean,
  showFooter: boolean,
  hasError: boolean
}
interface IErrorInfo {
  type: string;
  message: string;
}

interface ISuccessMsg {
  message: string;
}

type NamedChildrenSlots = {
    header?: ReactChild
    warningmsg?: ReactChild,
    content: ReactChild,
    footer?: ReactChild,
    errorInfo?: IErrorInfo,
    successMsg?: ISuccessMsg
  }

const isObject = <T extends object>(value: any): value is T =>
  typeof value === 'object' && typeof value !== 'function' && value !== undefined

  const isNamedSlots = (children: any): children is NamedChildrenSlots =>
  isObject(children) && 'content' in children

export class ToggleContainer extends Component<Props> {
  render() {
    const { children, shouldDisplayMain, showFooter, showSuccess, loading , hasError} = this.props

    // console.log("props in ToggleContainer")
    // console.log(this.props)

    if (!children) {
      throw new Error('children is missing !')
    }

    if (isNamedSlots(children)) {
      // console.log("props in ToggleContainer::isNamedSlots")
      const { header, warningmsg, content, footer, errorInfo, successMsg } = children
      // let cssClass = ''
      let showWarningMsg = false, showMainContent = false;
      if (loading && (hasError === false)) {
        return <LoaderComponent />;
      }
      else {
        if((!shouldDisplayMain) && (hasError === false)) {
          showWarningMsg = true;
          console.log("I am gonna show showWarningMsg ");
        } else{
          showMainContent = true
          console.log("I am gonna show showMainContent ");
        }
      }
      let parsedErrorMessage = ''
      // if(errorInfo === undefined || errorInfo === null) {
      //   console.log('errorInfo is undefined or null')
      // }
      if(errorInfo) {
        console.log('alertType ' + errorInfo.type)
        if(errorInfo.type === 'alert-danger') {
          try{
            console.log("I am gonna show Alert with error message=" +  errorInfo.message);
            const parsedErrorObj = JSON.parse(errorInfo.message);
            if(parsedErrorObj)  {
              parsedErrorMessage = parsedErrorObj['non_field_errors'][0];
            }
          }
          catch(err) {
            // console.log('In exception handler ' + errorInfo.message + ' hasError=' + hasError);
            // console.log('In exception handler ' + errorInfo + ' errorInfo.type=' + errorInfo.type);
            parsedErrorMessage = errorInfo.message;
          }
        }
      }
      let successMsgText = ''
      if(successMsg) {
        console.log('successMsg ' + successMsg.message);
        successMsgText = successMsg.message;
      }

      console.log('showWarningMsg is ' + showWarningMsg);

      return (
        <div className="card">
         { header ? <div className="card-header">{header}</div> : null }
         { showWarningMsg ? <div className="card-header">{warningmsg}</div> : null }
         { showMainContent ? <div className="card-content">{content}</div> : null }
         { showSuccess &&
                Notification({
                    title: 'Success',
                    message: successMsgText,
                    type: 'success',
                    duration: 2000
                  }) }
         <br/>
         { showFooter && <div className="card-content">{footer}</div> }
         {hasError && <div className="card-content">
                { errorInfo && errorInfo.type === 'alert-danger' &&
                <Alert color="error">
                  { parsedErrorMessage }
                </Alert>
              }
           </div>
         }
        </div>
      )
    }
    return <div className="card">{children}</div>
  }
}

export default ToggleContainer
