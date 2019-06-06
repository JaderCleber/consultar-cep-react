import React from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

interface IMapCard {
	street: string | undefined;
	neighborhood: string | undefined;
	city: string | undefined;
	cep: string | undefined;
	onClose(): void | undefined;
	classes: any;
	google: any;
	location: any;
}

const MapCard: React.FC<IMapCard> = ({
	google,
	street,
	neighborhood,
	city,
	cep,
	onClose,
	classes,
	location
}) => {
	const style = new google.maps.StyledMapType([{
		stylers: [{
			weight: 100,
		}]
	}]);
	// new Promise(async (resolve, reject) => {
	// 	const geocoder = new google.maps.Geocoder();
	// 	const map = new google.maps.Map(document.getElementById('map'), {
	// 		zoom: 14,
	// 	});
	// 	geocoder.geocode({ 'address': cep }, (results: google.maps.GeocoderResult[], status: any) => {
	// 		if (status === 'OK') {
	// 			map.setCenter(results[0].geometry.location);
	// 			const marker = new google.maps.Marker({
	// 				map: map,
	// 				position: results[0].geometry.location
	// 			});
	// 		}
	// 		resolve();
	// 	});
	// });

	return (
		<Paper className={classes.paper}>
			<Grid container spacing={10} justify="flex-end">
				<Grid item xs={2}>
					<Button onClick={onClose}>X</Button>
				</Grid>
			</Grid>

			<Typography gutterBottom variant="h5">
				{street}
			</Typography>
			<Typography gutterBottom variant="body1" id="neighborhood">
				{neighborhood}
			</Typography>
			<Typography gutterBottom variant="body1" id="city">
				{city}
			</Typography>
			<Typography gutterBottom variant="body1" id="cep">
				{cep}
			</Typography>

			<Grid container spacing={10} justify="center">
				<Grid item xs={4}>
					<Map google={google} zoom={14} initialCenter={location} styles={style}>
						<Marker position={location} />
					</Map>
				</Grid>
			</Grid>
			{/* <div id="map"></div> */}

		</Paper>
	);
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAExktO4hzgGp4gbIMlOoQgtBAMTU6XyiM',
})(MapCard)
