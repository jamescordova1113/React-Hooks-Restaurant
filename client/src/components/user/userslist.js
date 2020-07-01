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
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteConfirm from '../common/confirm';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../../context/user';
import { usePlan } from '../../context/plan';
import { history } from '../..';

const columns = [
  { id: 'no', label: 'No', minWidth: 50 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 50 },
  { id: 'action', label: 'Action', minWidth: 70 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  titlePos: {
    marginTop: '80px',
    marginBottom: '40px'
  },
  pagination: {
    marginBottom: '50px'
  }
});

const UsersList = () => {
  const classes = useStyles();
  const { methods: { getUsers, removeUser, getSelectedUser } } = useUser();
  const { data: { currentUser, users, totalCount, params, params: { currentPage, listCount }}} = useUser();
  const { methods: { getPlans } } = usePlan();
  const { data: { paramsPlan } } = usePlan();
  const [page, setPage] = React.useState(parseInt(currentPage));
  const [rowsPerPage, setRowsPerPage] = React.useState(listCount);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newParams = { ...params, listCount: rowsPerPage, currentPage: parseInt(page) };
    getUsers(newParams);
  }, [rowsPerPage, page]);

  const confirmDeleteUser = (user) => {
    setOpen(true);
    setUser(user);
  }

  const handleCancelRemoveUser = () => {
    setOpen(false);
    setUser({});
  } 

  const handleRemoveUser = () => {
    removeUser(user._id)
    getUsers(params);
  };

  const handleChangePage = (event, PageNumber) => {
    setPage(PageNumber);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectedUserPlan = (params) => {
    getSelectedUser(params);
    const newParamsPlan = { ...paramsPlan, _id: params._id };
    getPlans(newParamsPlan);
    history.push('/usertravellist');
  };

  const handleUpdateUser = (params) => {
    getSelectedUser(params);
    history.push('/updateuser');
  };

  const handleAddUser = () => {
    history.push('/adduser');
  };

  return (
    <div>
      <DeleteConfirm
        open={open} 
        message={`Are you sure to delete user "${user.firstName || ""} ${user.lastName || ""}"`}
        handleClose={handleCancelRemoveUser}
        handleAction={handleRemoveUser}
      />

      <Grid item className={classes.titlePos} xs={12} container>
        <Grid item xs={6}>
            <Typography variant="h5" >
              USERS MANAGEMENT TABLE
            </Typography>
        </Grid>
        <Grid item xs={6} direction="row" justify="flex-end" alignItems="center" container>
          <Button onClick={() => handleAddUser()} variant="contained" color="primary" startIcon={<AddCircle />}>
            Add User
          </Button>
        </Grid>
      </Grid>

      <Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map((user, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                    {columns.map((column, i) => {
                      const value = user[column.id];
                      if (column.id === 'no') {
                        return (
                          <TableCell align='center' key={i}>
                            {rowsPerPage * page + index + 1}
                          </TableCell>
                        )
                      } else if (column.id === 'action') {
                        if (currentUser.info.role === 'admin') {
                          return (
                            <TableCell align='center' key={i}>
                               <IconButton aria-label="view plan" variant="contained" onClick={() => handleSelectedUserPlan(user)}>
                                <VisibilityIcon />
                              </IconButton>
                              <IconButton aria-label="edit user" variant="contained" color="secondary" onClick={() => handleUpdateUser(user)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete user" variant="contained" onClick={() => confirmDeleteUser(user)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell align='center' key={i}>
                              <IconButton aria-label="edit user" variant="contained" color="secondary" onClick={() => handleUpdateUser(user)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete user" variant="contained" onClick={() => confirmDeleteUser(user)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          )
                        }
                      }
                      return (
                        <TableCell key={i} align='center'>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {!users.length && <h2 style={{textAlign:'center'}}>No Travel Plan</h2>}
        </TableContainer>

        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[7, 10, 15]}
          component="div"
          count={+totalCount}
          rowsPerPage={+rowsPerPage}
          page={+page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default UsersList;