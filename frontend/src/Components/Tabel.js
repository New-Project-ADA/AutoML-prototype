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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, color: 'black' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">c_k0</TableCell>
            <TableCell align="right">c_k1</TableCell>
            <TableCell align="right">c_k2</TableCell>
            <TableCell align="right">c_v1</TableCell>
            <TableCell align="right">c_v2</TableCell>
            <TableCell align="right">c_v3</TableCell>
            <TableCell align="right">c_v4</TableCell>
            <TableCell align="right">c_v5</TableCell>
            <TableCell align="right">m_k0</TableCell>
            <TableCell align="right">m_k1</TableCell>
            <TableCell align="right">m_k2</TableCell>
            <TableCell align="right">m_weight</TableCell>
            <TableCell align="right">b_k0</TableCell>
            <TableCell align="right">b_k1</TableCell>
            <TableCell align="right">b_k2</TableCell>
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
              <TableCell align="right">{row.c_k0}</TableCell>
              <TableCell align="right">{row.c_k1}</TableCell>
              <TableCell align="right">{row.c_k2}</TableCell>
              <TableCell align="right">{row.c_v1}</TableCell>
              <TableCell align="right">{row.c_v2}</TableCell>
              <TableCell align="right">{row.c_v3}</TableCell>
              <TableCell align="right">{row.c_v4}</TableCell>
              <TableCell align="right">{row.c_v5}</TableCell>
              <TableCell align="right">{row.m_k0}</TableCell>
              <TableCell align="right">{row.m_k1}</TableCell>
              <TableCell align="right">{row.m_k2}</TableCell>
              <TableCell align="right">{row.m_weight}</TableCell>
              <TableCell align="right">{row.b_k0}</TableCell>
              <TableCell align="right">{row.b_k1}</TableCell>
              <TableCell align="right">{row.b_k2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
