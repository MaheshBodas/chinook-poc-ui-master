import React from "react"
import logo from 'src/_images/ListLoading.gif'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
// import { Col, Container, Row } from 'reactstrap';
// var splitterStyle = {
//  height: 100,
//  width: 100
// }
const divStyle = {
    width: window.innerWidth,
    height: window.innerHeight,
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: rgba(0, 0, 0, 0),
    backgroundRepeat: 'no-repeat',
    paddingTop: 10,
    // backgroundSize: {'height': `${500}px`, 'width': `${500}px` },
    backgroundImage: `url(${logo})`,
    backgroundSize: 'contain'
  };


// const divStyle = {
//     opacity:0.5
// }
export const LoaderComponent = (scope) => (
    // <div className="cComponent" style={divStyle} >
    // </div>
    // <div className="app flex-row align-items-top"style={divStyle}>
    //   <Container>
    //     <Row className="justify-content-center">
    //       <Col md="4">
    //         <img alt="Loading" src={logo } />
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>

    <Card>
      <CardHeader title="Loading..." />
      <Divider />
      <PerfectScrollbar>
        <Box style={divStyle} justifyContent="center" alignItems="center">
          <Table>
            <TableBody>
                <TableRow>
                  <TableCell>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
)
