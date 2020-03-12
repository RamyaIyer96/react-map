import React from 'react';
import { Row, Col, Select, Divider } from 'antd';
import GoogleMap from '../GoogleMap';
import './style.css';
import { getCountries, getStates, getCities } from '../../helpers';
const { Option } = Select;

export default class Map extends React.Component {
	state = {
		countries: [],
		states: [],
		cities: [],
		latitude: 42.317432,
		longitude: -83.026772
	};

	componentDidMount() {
		const countries = getCountries();
		this.setState({ countries });
	}

	countryChanged = countryId => {
		const { countries } = this.state;
		let countryDetails = countries.find(
			each => each.countryID === countryId
		);
		const { latitude, longitude } = countryDetails;
		const states = getStates(countryId);
		this.setState({ states, latitude, longitude });
	};

	stateChanged = stateId => {
		const { states } = this.state;
		let stateDetails = states.find(each => each.stateID === stateId);
		const { latitude, longitude } = stateDetails;
		const cities = getCities(stateId);
		this.setState({ cities, latitude, longitude });
	};

	citySelected = cityId => {
		const { cities } = this.state;
		let cityDetails = cities.find(each => each.cityID === cityId);
		const { latitude, longitude } = cityDetails;
		this.setState({
			latitude,
			longitude
		});
	};

	handleLoaded = (map, maps) => {
		console.log(map, 'mapmapmap');
		console.log(maps, 'mapsmapsmaps');
	};

	render() {
		const { countries, states, cities, latitude, longitude } = this.state;
		return (
			<React.Fragment>
				<Row>
					<Col span={8}>
						<Select
							showSearch
							style={{ width: 200 }}
							placeholder="Select Country"
							optionFilterProp="children"
							autoComplete="off"
							onChange={this.countryChanged}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							{countries.map(country => (
								<Option key={country.countryID}>
									{country.countryName}
								</Option>
							))}
						</Select>
					</Col>
					<Col span={8}>
						<Select
							showSearch
							style={{ width: 200 }}
							placeholder="Select State"
							optionFilterProp="children"
							onChange={this.stateChanged}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							{states.map(state => (
								<Option key={state.stateID}>
									{state.stateName}
								</Option>
							))}
						</Select>
					</Col>
					<Col span={8}>
						<Select
							style={{ width: 200 }}
							placeholder="Select City"
							optionFilterProp="children"
							onChange={this.citySelected}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							{cities.map(city => (
								<Option
									key={`${city.cityID}-${city.countryID}`}
									value={city.cityID}
								>
									{city.cityName}
								</Option>
							))}
						</Select>
					</Col>
				</Row>
				<Divider>Map</Divider>
				<Row>
					<Col span={24} style={{ height: 400 }}>
						<GoogleMap lat={latitude} lng={longitude} />
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
