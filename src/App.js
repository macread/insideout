import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },  
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});
class App extends Component {

  constructor() {
    super()
    this.state = {
      addDialog: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      salary: '',
      updateDialogOpen: [],
      employees: []
    }
  }

  componentDidMount() {
    this.getAllEmployees();
  }

  getAllEmployees(){
    axios.get('/api/employees/').then(results => {
      this.setState({
        employees: results.data
      });
    }).then( () => {
      let tempArray = this.state.employees.map( () => {
        return false;
      })
      this.setState({
        updateDialogOpen: tempArray
      })
    })
  }

  deleteEmployee(id) {
    console.log('deleteEmployee', id)
    axios.delete(`/api/employee/${id}`).then(axios.get('/api/employees/').then(results => {
        this.setState({
          employees: results.data
        });
    }))
  }

  openUpdateDialog(idx){
    let tempArray = this.state.updateDialogOpen.slice();
    tempArray[idx] = true;
    this.setState({
      updateDialogOpen: tempArray
    })
  }

  closeUpdateDialog(idx){
    let tempArray = this.state.updateDialogOpen.slice();
    tempArray[idx] = false;
    this.setState({ 
      updateDialogOpen: tempArray 
    });
  };

  updateFirstName(idx, val){
    let tempArray = this.state.employees.slice();
    tempArray[idx].firstname = val;
    this.setState({
      employees: tempArray
    })
  }

  updateLastName(idx, val){
    let tempArray = this.state.employees.slice();
    tempArray[idx].lastname = val;
    this.setState({
      employees: tempArray
    })
  }

  updateEmail(idx, val){
    let tempArray = this.state.employees.slice();
    tempArray[idx].email = val;
    this.setState({
      employees: tempArray
    })
  }

  updatePhone(idx, val){
    let tempArray = this.state.employees.slice();
    tempArray[idx].phone = val;
    this.setState({
      employees: tempArray
    })
  }

  updateSalary(idx, val){
    let tempArray = this.state.employees.slice();
    tempArray[idx].salary = val;
    this.setState({
      employees: tempArray
    })
  }

  updateEmployee(idx){
    axios.put('/api/employee/',{
      id: this.state.employees[idx].id,
      firstName: this.state.employees[idx].firstname,
      lastName: this.state.employees[idx].lastname,
      email: this.state.employees[idx].email,
      phone: this.state.employees[idx].phone,
      salary: this.state.employees[idx].salary
   }).then(this.closeUpdateDialog(idx))
  }

  addEmployee(){
    axios.post('/api/employee/',{
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      salary: this.state.salary
   }).then(() => {
     this.setState({
       addDialog: false,
       firstName: '',
       lastName: '',
       email: '',
       phone: '',
       salary: ''
     })
   }).then( () =>{
     this.getAllEmployees();
   })
  }

  closeAddDialog(){
    this.setState({
      addDialog: false
    })
  }

  openAddDialog(){
    this.setState({
      addDialog: true
    })
  }

  handleAddEmpField(key, val){
    this.setState({
      [key]: val
    })
  }

  render() {
    const {
      classes
    } = this.props;
    return (

      <Paper className = {
        classes.root
      } >
        <Table className = {
          classes.table
        } >
        <TableHead>
            <TableRow >
              <TableCell > Employee Name </TableCell>
              <TableCell > Email Address </TableCell>
              <TableCell > Phone </TableCell> 
              <TableCell numeric > Salary </TableCell>
              <TableCell ></TableCell>
            </TableRow> 
          </TableHead> 
          <TableBody > {
            this.state.employees.map((employee, idx) => {
              return ( <TableRow key = {
                  employee.id
                } >
                <TableCell component = "th"
                scope = "employee" > {
                  employee.firstname + ' ' + employee.lastname
                } </TableCell> 
                <TableCell > {
                  employee.email
                } </TableCell> 
                <TableCell > {
                  employee.phone
                } </TableCell> 
                <TableCell numeric > {
                  employee.salary
                } </TableCell>
                <TableCell numeric > 
                  <Button variant="fab" color="primary" aria-label="Edit" className={classes.button}>
                    <EditIcon onClick={ () => this.openUpdateDialog(idx) }/>
                    <Dialog
                      open={this.state.updateDialogOpen[idx]}
                      onClose={ () => this.closeUpdateDialog(idx) }
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="firstName"
                          label="First Name"
                          type="text"
                          value={this.state.employees[idx].firstname}
                          onChange={ (e) => this.updateFirstName(idx, e.target.value)}
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          id="lastName"
                          label="Last Name"
                          type="text"
                          value={this.state.employees[idx].lastname}
                          onChange={ (e) => this.updateLastName(idx, e.target.value)}
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          id="email"
                          label="Email Address"
                          type="email"
                          vvalue={this.state.employees[idx].email}
                          onChange={ (e) => this.updateEmail(idx, e.target.value)}
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          id="phone"
                          label="Phone"
                          type="number"
                          value={this.state.employees[idx].phone}
                          onChange={ (e) => this.updatePhone(idx, e.target.value)}
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          id="salary"
                          label="Salary"
                          type="number"
                          value={this.state.employees[idx].salary}
                          onChange={ (e) => this.updateSalary(idx, e.target.value)}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={ () => this.closeUpdateDialog(idx) } color="primary">
                          Cancel
                        </Button>
                        <Button onClick={ () => this.updateEmployee(idx) } color="primary">
                          Update
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Button>
                  <Button 
                      variant="fab" 
                      color="secondary" 
                      aria-label="Delete" 
                      className={classes.button} 
                      onClick={ () => this.deleteEmployee(employee.id)}>
                    <DeleteIcon />
                  </Button>
                  </TableCell> 
                </TableRow>
              );
            })
          } 
          </TableBody>
        </Table>

        <Button variant="contained" color="primary" className={classes.button} onClick={ () => this.openAddDialog()}>
          Add New Employee
        </Button>
        <Dialog
          open={this.state.addDialog}
          onClose={ () => this.closeAddDialog() }
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstname"
              label="First Name"
              type="text"
              value={this.state.firstName}
              onChange={ (e) => this.handleAddEmpField('firstName', e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="lastname"
              label="Last Name"
              type="text"
              value={this.state.lastName}
              onChange={ (e) => this.handleAddEmpField('lastName', e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              vvalue={this.state.email}
              onChange={ (e) => this.handleAddEmpField('email', e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="phone"
              label="Phone"
              type="number"
              value={this.state.phone}
              onChange={ (e) => this.handleAddEmpField('phone', e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="salary"
              label="Salary"
              type="number"
              value={this.state.salary}
              onChange={ (e) => this.handleAddEmpField('salary', e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.closeAddDialog() } color="primary">
              Cancel
            </Button>
            <Button onClick={ () => this.addEmployee() } color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>

    );
  }
}

export default withStyles(styles)(App);