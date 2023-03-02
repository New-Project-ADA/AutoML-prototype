import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { red } from '@mui/material/colors';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('count', 159, 6.0, 24, 4.0),
//   createData('mean', 237, 9.0, 37, 4.3),
//   createData('std', 262, 16.0, 24, 6.0),
//   createData('min', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
// console.log(rows);
export default function BasicTable(props) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 650, color: 'black' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">File C</TableCell>
            <TableCell align="right">File B</TableCell>
            <TableCell align="right">File M</TableCell>
            {/* <TableCell align="right">Monitor</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.input_c1}</TableCell>
              <TableCell align="right">{row.input_b1}</TableCell>
              <TableCell align="right">{row.input_m1}</TableCell>
              {/* <TableCell align="right"><a href='http://localhost:3000/monitor/'+{row.id}></a></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
