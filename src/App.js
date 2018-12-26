import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});
class App extends Component {
  state = {
    currentValue: 0,
    months: 0,
    miles: 0,
    previousOwners: 0,
    collisions: 0,
    appraisedValue: 0
  };
  handleChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  handleSubmit = () => {
    fetch("http://localhost:5000/carValue", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(appraisedValue =>
        this.setState({ appraisedValue: appraisedValue.usedCarValue })
      );
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={5}>
          <Typography variant="h5" component="h3">
            Car Appraiser
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={5}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="standard-number"
              label="Car's Current Value"
              value={this.state.currentValue}
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              name="currentValue"
              margin="normal"
            />
            <TextField
              required
              id="standard-number"
              label="Car's Age in Months"
              value={this.state.months}
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              name="months"
              margin="normal"
            />
            <TextField
              required
              id="standard-number"
              label="Car's Mileage"
              value={this.state.miles}
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              name="miles"
              margin="normal"
            />
            <TextField
              required
              id="standard-number"
              label="How many previous owners"
              value={this.state.previousOwners}
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              name="previousOwners"
              margin="normal"
            />
            <TextField
              required
              id="standard-number"
              label="How many collisions"
              value={this.state.collisions}
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              name="collisions"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Paper>
        <Paper className={classes.root} elevation={5}>
          <Typography variant="h5" component="h3">
            $ {this.state.appraisedValue}
          </Typography>
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
