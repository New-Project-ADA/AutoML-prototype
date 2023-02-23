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
            <TableCell>Index</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Mean</TableCell>
            <TableCell align="right">Std</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">25%</TableCell>
            <TableCell align="right">50%</TableCell>
            <TableCell align="right">75%</TableCell>
            <TableCell align="right">Max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.index}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.mean}</TableCell>
              <TableCell align="right">{row.std}</TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.dualima}</TableCell>
              <TableCell align="right">{row.limanol}</TableCell>
              <TableCell align="right">{row.tujuhlima}</TableCell>
              <TableCell align="right">{row.max}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
