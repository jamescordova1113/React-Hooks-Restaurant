import React, {useEffect} from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Grid,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../../context/user';
import { usePlan } from '../../context/plan';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  loader: {
    margin: 'auto',
    height: '300px'
  },
  titlePos: {
    marginTop: 80,
    marginBottom: 40
  }
});

const columns = [
  { 
    id: 'no', 
    label: 'No', 
    minWidth: 50,
    align: 'center'
  },
  { 
    id: 'destination', 
    label: 'Destination', 
    minWidth: 100,
    align: 'center' 
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 120,
    align: 'center'
  },
  {
    id: 'endDate',
    label: 'End Date',
    minWidth: 120,
    align: 'center'
  },
  { 
    id: 'comment',
    label: 'Comment',
    minWidth: 170,
    align: 'center',
  },
];
const NextMonthPlans = () => {
  const classes = useStyles();
  const { methods: { getFuturePlans } } = usePlan();
  const { data: { currentUser } } = useUser();
  const { data: { futurePlans }} = usePlan();

  useEffect(() => {
    const userId = currentUser.info._id;
    getFuturePlans(userId);
  }, []);

  return (
    <div>
      <Grid item className={classes.titlePos} xs={12} container>
        <Grid item xs={6}>
            <Typography variant="h5">
              Next Month Travel Plan
            </Typography>
        </Grid>
      </Grid>
      
      <Paper className={classes.root}>  
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {futurePlans && futurePlans.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      if (column.id === 'no') {
                        return (
                          <TableCell align='center' key={i}>
                            {index + 1}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={i} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {!futurePlans.length && <h2 style={{textAlign:'center'}}>No Travel Plan for the Next Month</h2>}
      </Paper>
    </div>
  );
}

export default NextMonthPlans;