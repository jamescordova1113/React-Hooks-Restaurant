import React, { useEffect, useState } from 'react';
import {
  Paper,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteConfirm from '../common/confirm';
import { makeStyles } from '@material-ui/core/styles';

import { useUser } from '../../context/user';
import { usePlan } from '../../context/plan';
import { history } from '../..';

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
  {
    id: 'action',
    label: 'Action',
    minWidth: 80,
    align: 'center'
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  titlePos: {
    marginTop: 80,
    marginBottom: 40
  }
});

const UserTravelList = () => {
  const classes = useStyles();

  const { methods: { getPlans, deletePlan, getSelectedPlan, editCurrentPage } } = usePlan();
  const { data: { selectedUser } } = useUser();
  const { data: { plan, totalCount, paramsPlan, paramsPlan: { currentPage, listCount } } } = usePlan();

  const [page, setPage] = React.useState(currentPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(listCount);
  const [travelPlan, setTravelPlan] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newParamsPlan = { ...paramsPlan, listCount: rowsPerPage, currentPage: page }; 
    newParamsPlan._id = selectedUser._id;
    getPlans(newParamsPlan);
  }, [page, rowsPerPage]);

  const confirmDeletePlan = (travelPlan) => {
    setOpen(true);
    setTravelPlan(travelPlan);
  }

  const handleCancelRemovePlan = () => {
    setOpen(false);
    setTravelPlan({});
  } 

  const handleRemovePlan = () => {
    deletePlan(travelPlan._id);
    const newParamsPlan = { ...paramsPlan, _id: selectedUser._id };
    getPlans(newParamsPlan);
  };

  const handleUpdatePlan = (params) => {
    getSelectedPlan(params);
    history.push('/updateuserplan');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    editCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreatePlan = () => {
    history.push('/createuserplan');
  };

  return (
    <div>
      <DeleteConfirm
        open={open} 
        message={`Are you sure to delete this plan "${travelPlan.destination || ""}`}
        handleClose={handleCancelRemovePlan}
        handleAction={handleRemovePlan}
      />

      <Grid item className={classes.titlePos} xs={12} container>
        <Grid item xs={6}>
            <Typography variant="h5" >
              {selectedUser.firstName}'s Travel List
            </Typography>
        </Grid>
        <Grid item xs={6} direction="row" justify="flex-end" alignItems="center" container>
          <Button onClick={() => handleCreatePlan()} variant="contained" color="primary" startIcon={<AddCircle />}>
            Create Plan
          </Button>
        </Grid>
      </Grid> 
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
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
              {plan && plan.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      if (column.id === 'no') {
                        return (
                          <TableCell align='center' key={i}>
                            {rowsPerPage * page + index + 1}
                          </TableCell>
                        )
                      } else if(column.id === 'action') {
                        return (
                          <TableCell align='center' key={i}>
                          <IconButton aria-label="Edit Plan" variant="contained" color="secondary" onClick={() => handleUpdatePlan(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="Delete Plan" variant="contained" onClick={() => confirmDeletePlan(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        )
                      }else  {
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
        {!plan.length && <h2 style={{textAlign:'center'}}>No Travel Plan</h2>}
        <TablePagination
          rowsPerPageOptions={[7, 10, 15]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    
  );
}

export default UserTravelList;