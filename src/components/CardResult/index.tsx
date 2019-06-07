/*global google*/
import React from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';

interface PropTypes {
	street: string | undefined;
	neighborhood: string | undefined;
	city: string | undefined;
	cep: string | undefined;
	onClose(): void | undefined;
	classes: any;
	location: any;
}

class CardResult extends React.PureComponent<PropTypes, {}> {
	componentDidMount() {
		const { location } = this.props;
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: location
		});
		new google.maps.Marker({
			position: location,
			map: map
		});
	}

	render() {
		const { classes, onClose, street, neighborhood, city, cep } = this.props;
		return (
			<Paper className={classes.paper} >
				<Grid container spacing={2} justify='flex-end'>
					<Grid item>
						<Button id='btn-close' onClick={onClose}>X</Button>
					</Grid>
				</Grid>

				<Typography gutterBottom variant='h5' id='street'>
					{street}
				</Typography>
				<Typography gutterBottom variant='body1' id='neighborhood'>
					{neighborhood}
				</Typography>
				<Typography gutterBottom variant='body1' id='city'>
					{city}
				</Typography>
				<Typography gutterBottom variant='body1' id='cep'>
					{cep}
				</Typography>

				<Grid container spacing={2} justify='center'>
					<Grid item xs={12}>
						<div id='map' className={classes.map}></div>
					</Grid>
				</Grid>
			</Paper>
		);
	};
}

export default CardResult;