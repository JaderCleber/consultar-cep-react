import React from 'react';
import CardResult from './components/CardResult';
import { Grid, Paper, FormControl, Input, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Geocode from 'react-geocode';
import classnames from 'classnames';

const KEY = 'AIzaSyCUv7kIrrpLwXW4xz0RrPFEbZZNWROKDwQ';
Geocode.setApiKey(KEY);

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  paper: {
    padding: theme.spacing(2),
  },
  gray: {
    background: '#efefef'
  },
  button: {
    margin: theme.spacing(1),
  },
  map: {
    height: `${window.innerHeight * 0.40}px`
  }
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
  mapReady: boolean;
  notFound: string;
}

interface PropTypes {
  classes: any;
}

class App extends React.PureComponent<PropTypes, IState> {
  state = {
    cep: '',
    found: {},
    location: null,
    mapReady: false,
    notFound: '',
  };

  script: HTMLScriptElement | undefined;

  componentDidMount() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.google.com/maps/api/js?key=${KEY}`;
    const scriptInDOM = document.getElementsByTagName('script')[0];
    if (scriptInDOM.parentNode) {
      scriptInDOM.parentNode.insertBefore(script, scriptInDOM);
      script.addEventListener('load', e => {
        this.setState({ mapReady: true });
      })
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ cep: e.target.value.replace(/\D/g, ''), notFound: '' });

  handlePress = (cep: string) => (e: React.KeyboardEvent<HTMLDivElement>) =>
    e.key === 'Enter' && cep.length === 8 && this.handleClick(cep)()
  handleClick = (cep: string) => () => {
    this.setState({ found: {}, location: null, notFound: '' }, async () => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.status === 200) {
          const data = await response.json();
          const geolocation = await Geocode.fromAddress(`${cep}+${data.logradouro}+${data.bairro}+${data.localidade}`);
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
      } catch (err) {
        this.setState({ notFound: 'Nenhum Resultado' });
      }

    });
  };

  handleClose = () => this.setState({ found: {}, cep: '' });

  render() {
    const { cep, found, location, mapReady, notFound }: IState = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Paper className={classnames(classes.paper, classes.gray)}>
            <Typography gutterBottom variant='h6'>
              Consultar
						</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Typography gutterBottom variant='overline'>
                  CEP
						</Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl className={classes.margin}>
                  <Input id='cep-search' value={cep} onChange={this.handleChange} onKeyPress={this.handlePress(cep)} />
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  id='btn-search'
                  disabled={cep.length !== 8}
                  onClick={this.handleClick(cep)}
                  variant='contained'
                  color='primary'
                  className={classes.button}>
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {found.cep && mapReady ? (
          <Grid item xs={12}>
            <CardResult
              cep={found.cep}
              street={found.street}
              neighborhood={found.neighborhood}
              city={found.city}
              onClose={this.handleClose}
              classes={classes}
              location={location}
            />
          </Grid>
        ) : (
            <Typography gutterBottom variant='h6'>
              {notFound}
            </Typography>
          )}
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
