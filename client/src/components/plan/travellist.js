import React, { useEffect, useState } from 'react';
import {
  Paper,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteConfirm from '../common/confirm';
import { makeStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';

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
  },

  filtertag: {
    marginTop: 30,
    marginBottom: 30
  }
});

const TravelList = () => {
  const classes = useStyles();

  const { methods: { getPlans, deletePlan, getSelectedPlan, editCurrentPage } } = usePlan();
  const { data: { currentUser } } = useUser();
  const { data: { plan, totalCount, paramsPlan, paramsPlan: { currentPage, listCount } } } = usePlan();

  const [travelPlan, setTravelPlan] = useState({});
  const [open, setOpen] = useState(false);

  const [filterParams, setFilterParams] = useState({});
  const [pageParams, setPageParams] = useState(paramsPlan);

  useEffect(() => {
    const newPageParams = {...pageParams, _id: currentUser.info._id};
    getPlans(newPageParams, filterParams);
  }, [pageParams, filterParams]);

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
    const newParamsPlan = { ...paramsPlan, _id: currentUser.info._id };
    getPlans(newParamsPlan);
  };

  const handleUpdatePlan = (params) => {
    getSelectedPlan(params);
    history.push('/updateplan');
  };

  const handleChangePage = (event, newPage) => {
    const currentPage = newPage;
    const newPageParams = { ...pageParams, currentPage };
    setPageParams(newPageParams);
    editCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    pageParams = {...pageParams, pageParams: event.target.value};
    pageParams.currentPage = 0;
    setPageParams(pageParams);
  };

  const handleCreatePlan = () => {
    history.push('/createplan');
  };

  function filterParamsChange(fieldName, fieldValue) {
    filterParams[fieldName] = fieldValue;
    setFilterParams(filterParams);
    getPlans(pageParams, filterParams);
  }

  filterParamsChange = debounce(filterParamsChange, 1000)

  return (
    <div>
      <DeleteConfirm
        open={open} 
        message={`Are you sure to delete this plan "${travelPlan.destination || ""}`}
        handleClose={handleCancelRemovePlan}
        handleAction={handleRemovePlan}
      />

      <Grid item className={classes.titlePos} xs={12} container>
        <Grid item xs={10}>
          <Typography variant="h5" >
            My Travel List
          </Typography>
        </Grid>
        <Grid item xs={2} direction="row" justify="flex-end" alignItems="center" container>
          <Button onClick={() => handleCreatePlan()} variant="contained" color="primary" startIcon={<AddCircle />}>
            Create Plan
          </Button>
        </Grid>
      </Grid>
      
      <Grid item className={classes.filtertag} xs={12} container>
        <Grid item xs={3}>
          <TextField
            name="startDateFilter"
            id="startDateFilter"
            type="date"
            variant="outlined"
            label="Start Date"
            onChange= {(e)=>filterParamsChange(e.target.name, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}  
            fullWidth
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <TextField
            name="endDateFilter"
            id="endDateFilter"
            type="date"
            variant="outlined"
            label="End Date"
            onChange = {(e)=>filterParamsChange(e.target.name, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}  
            fullWidth
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <TextField
            name="destinationFilter"
            id="destinationFilter"
            type="text"
            variant="outlined"
            label="Destination"
            onChange = {(e) => filterParamsChange(e.target.name, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}  
            fullWidth
          />
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
                            {pageParams.listCount * pageParams.currentPage + index + 1}
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
          {!plan.length && <h2 style={{textAlign:'center'}}>No Travel Plan</h2>}
        </TableContainer>
      </Paper>
    </div>
    
  );
}

export default TravelList;