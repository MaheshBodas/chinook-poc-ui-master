import React, { Component } from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Layout, Form, Table, Pagination } from 'element-react';
import { viewAllTracksActions} from '../../_actions';
import './ViewTrackGrid.css';

import { ComposableContainer } from './../ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../ToggleContainer/ToggleContainer'

// const ComposableContainer = React.lazy(() => import('./../ComposableContainer/ComposableContainer').then(module => ({ default: module.ComposableContainer })))
// const ToggleContainer = React.lazy(() => import('./../ToggleContainer/ToggleContainer').then(module => ({ default: module.ToggleContainer })))

const emptySelectTrackInstance = {}
const emptyColumnNames = []
class ViewTrackGrid extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        console.log('constructor ViewTrackGrid')
        this.state = {
          isMounted: false,
          currentPage: 1,
          currentPageSize: 20
        };

        this.onCurrentPageChange = this.onCurrentPageChange.bind(this);
        this.onCurrentPageSizeChange = this.onCurrentPageSizeChange.bind(this);
    }

    componentDidMount() {
      this._isMounted = true
      this.props.getTracks(1, 20)
    }

    componentDidUpdate(prevProps, prevState) {
      // Typical usage (don't forget to compare props):
      if ((this.state.currentPage !== prevState.currentPage) ||
            this.state.currentPageSize !== prevState.currentPageSize) {
        this.props.getTracks(this.state.currentPage, this.state.currentPageSize)
      }
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    onCurrentPageChange = event => {
      const selectedPage = (event !== '') ? event : 'None'
      console.log('onCurrentChange selectedPage is ' + selectedPage)

      // Fetch data related to selected RiskType
      if(selectedPage !== 'None') {
        if(this._isMounted) {
          const { currentPageSize = null } = this.state;
          console.log('currentPageSize is ' + currentPageSize)
          if(currentPageSize !== null) {
              this.setState((state) => ({
                currentPage: selectedPage,
                currentPageSize: state.currentPageSize
              }));
          }
        }
      } else {
        console.log('Dispacting resetAllTracks')
        if(this._isMounted) {
          this.props.resetAllTracks()
        }
      }
    }

    //
    onCurrentPageSizeChange = event => {
      const selectedPageSize = (event !== '') ? event : 'None'
      console.log('onCurrentPageSizeChange selectedPageSize is ' + selectedPageSize)
      // Fetch data related to selected RiskType
      if(selectedPageSize !== 'None') {
        if(this._isMounted) {
          this.setState((state) => ({
            currentPage: 1,
            currentPageSize: selectedPageSize
          }));
        }
      } else {
        console.log('Dispacting resetAllTracks')
        if(this._isMounted) {
          this.props.resetAllTracks()
        }
      }
    }

    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)
    }

    render() {
      const {type, message, tracksInstancesTable, tracksInstanceTableColumns, count } = this.props;
      const errorInfo = {type: type, message: message}
      const oTrackTableColumns = tracksInstanceTableColumns || emptyColumnNames
      const { currentPage = null, currentPageSize = null } = this.state;
      // console.log('tracksInstancesTable' + tracksInstancesTable)
      return (
        <div>
          <ComposableContainer showHeader={true}>
          {{
            header:(
              <Grid
                    item
                    key={1}
                    sx={{
                      backgroundColor: 'background.default',
                      minWidth: '100%',
                      px: 3
                    }}
                  >
                  <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Use pagination to navigate through Track records.
                  </Typography>
                </Grid>
            ),
            content: (
              <ToggleContainer loading={this.props.loading} shouldDisplayMain={this.props.shouldDisplayMain}
                  showFooter={this.props.showFooter} hasError={this.props.hasError} showSuccess={this.props.showSuccessMsg}>
              {{
                warningmsg: (
                  <Form ref="warningform" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}} model={emptySelectTrackInstance}>
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">
                          <h4>Invalid Track Type Name or No Data found</h4>
                        </Layout.Col>
                  </Layout.Row>
                </Form>
                ),
                content: (
                  <div className="ui-tabs ui-widget ui-widget-content ui-corner-all">
                    { tracksInstancesTable && <Table
                          style={{width: '100%'}}
                          columns={oTrackTableColumns}
                          data={tracksInstancesTable}
                          height={400}
                     />
                    }
                    {
                      <div className="block">
                        { currentPage && currentPageSize && <Pagination layout="sizes, total, prev, pager, next"
                          currentPage={currentPage} total={count} pageSize={currentPageSize}
                          pageSizes={[10, 20, 30, 40, 50]}
                          onCurrentChange={this.onCurrentPageChange}
                          onSizeChange={this.onCurrentPageSizeChange}
                        />
                        }
                      </div>
                    }
                  </div>
                ),
                errorInfo: errorInfo
              }}
            </ToggleContainer>
            )
          }}
          </ComposableContainer>
        </div>
      );
    }
}

function mapStateToProps(state) {
    const { alert, authentication, viewalltracks } = state;
    const { loggingIn } = authentication;
    const {type, message} = alert;
    const {tracksInstancesTable, tracksInstanceTableColumns, count, loading } = viewalltracks

    let shouldDisplayMain = false
    let showFooter = false
    let hasError = false

    if(tracksInstancesTable && tracksInstancesTable.length > 0) {
      shouldDisplayMain = true
      showFooter = true
    }

    if(type === 'alert-danger') {
      hasError = true
      console.log('This is an error')
    }
    // console.log('mapStateToProps View Tracks' + tracksInstancesTable + shouldDisplayMain)
    return {
      loggingIn,
      type,
      message,
      shouldDisplayMain,
      showFooter,
      tracksInstancesTable,
      tracksInstanceTableColumns,
      count,
      loading,
      hasError
    }
}

function mapDispatchToProps(dispatch) {
    return {        
        getTracks: (pageNum, pageSize) => dispatch( viewAllTracksActions.getTracks(pageNum, pageSize) ),
        resetAllTracks: () => dispatch(viewAllTracksActions.resetAllTracks())
    }
}

const connectedViewTrackGrid = connect(mapStateToProps , mapDispatchToProps)(ViewTrackGrid);
export { connectedViewTrackGrid as ViewTrackGrid };
