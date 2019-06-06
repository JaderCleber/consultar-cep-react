import React from 'react';
import MapCard from './components/MapCard';
import { Grid, Paper, InputLabel, FormControl, Input, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Geocode from 'react-geocode';
import classnames from 'classnames';

Geocode.setApiKey("AIzaSyAExktO4hzgGp4gbIMlOoQgtBAMTU6XyiM");

const styles = (theme: any) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: '2%'
  },
  gray: {
    background: '#efefef'
  },
  button: {
    margin: theme.spacing(1),
  },
});

interface IState {
  cep: string;
  found: {
    cep?: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    startNumber?: string;
  };
  location: any;
}

interface PropTypes {
  classes: any;
}

class App extends React.PureComponent<PropTypes, IState> {
  state = {
    cep: '',
    found: {},
    location: null
  };

  constructor(props: any) {
    super(props);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ cep: e.target.value.replace(/\D/g, '') });

  handleClick = () => {
    this.setState({ found: {}, location: null }, async () => {
      const response = await fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`);
      if (response.status === 200) {
        const data = await response.json();
        const geolocation = await Geocode.fromAddress(data.cep);
        const { location } = geolocation.results[0].geometry;
        this.setState({
          found: {
            cep: data.cep,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: `${data.localidade} - ${data.uf}`,
            startNumber: data.complemento.substr(3, data.complemento.indexOf('/'))
          },
          location
        });
      }

    });
  };

  handleClose = () => this.setState({ found: {}, cep: '' });

  render() {
    const { cep, found, location }: IState = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={10}>
        <Grid item xs={12}>
          <Paper className={classnames(classes.paper, classes.gray)}>
            <Typography gutterBottom variant="h6">
              Consultar
						</Typography>
            <Grid container spacing={10}>
              <Grid item sm={2}>
                <Typography gutterBottom variant="overline">
                  CEP
						</Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl className={classes.margin}>
                  <Input id="cep-search" value={cep} onChange={this.handleChange} />
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={this.handleClick} variant="contained" color="primary" className={classes.button}>
                  Primary
      </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {found.cep && (
          <Grid item xs={12}>
            <MapCard
              cep={found.cep}
              street={found.street}
              neighborhood={found.neighborhood}
              city={found.city}
              onClose={this.handleClose}
              classes={classes}
              location={location}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
