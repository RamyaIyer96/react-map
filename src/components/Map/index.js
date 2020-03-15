import React from "react";
import { Row, Col, Select, Divider, Spin } from "antd";
import axios from "axios";
import GoogleMap from "../GoogleMap";
import "./style.css";
import { getCountries, getStates, getCities } from "../../helpers";
const { Option } = Select;
const BASE_URL = "http://127.0.0.1:5000";
export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			states: [],
			cities: [],
			latitude: 42.317432,
			longitude: -83.026772,
			stations: [],
			loading: false
		};
	}

	componentDidMount() {
		const countries = getCountries();
		this.setState({ countries });
	}

	countryChanged = async countryId => {
		const { countries } = this.state;
		let countryDetails = countries.find(
			each => each.countryID === countryId
		);
		const { latitude, longitude } = countryDetails;
		// const stations = await this.getByLatLong(latitude, longitude);
		const stations = await this.getByName(countryDetails.countryName);
		const states = getStates(countryId);
		this.setState({ states, latitude, longitude, stations });
	};

	stateChanged = async stateId => {
		const { states } = this.state;
		let stateDetails = states.find(each => each.stateID === stateId);
		const { latitude, longitude } = stateDetails;
		// const stations = await this.getByLatLong(latitude, longitude);
		const stations = await this.getByName(stateDetails.stateName);
		const cities = getCities(stateId);
		this.setState({ cities, latitude, longitude, stations });
	};

	citySelected = async cityId => {
		const { cities } = this.state;
		let cityDetails = cities.find(each => each.cityID === cityId);
		const { latitude, longitude } = cityDetails;
		// const stations = await this.getByLatLong(latitude, longitude);
		const stations = await this.getByName(cityDetails.cityName);
		this.setState({
			latitude,
			longitude,
			stations
		});
	};

	getByLatLong = async (lat, lng) => {
		try {
			await this.setState({
				loading: true
			});
			let formData = new FormData();
			formData.append("lat", lat);
			formData.append("lng", lng);
			let data = await axios.post(`${BASE_URL}/reverse`, formData);
			await this.setState({
				loading: false
			});
			return data.data;
		} catch (err) {
			await this.setState({
				loading:false
			})
			return [];
		}
	};

	getByName = async name => {
		try {
			await this.setState({
				loading: true
			});
			let data = await axios.get(`${BASE_URL}/${name}`);
			await this.setState({
				loading: false
			});
			return data.data;
		} catch (err) {
			await this.setState({
				loading:false
			})
			return [];
		}
	};

	render() {
		const {
			countries,
			states,
			cities,
			latitude,
			longitude,
			loading,
			stations
		} = this.state;
		return (
			<React.Fragment>
				<Spin spinning={loading}>
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
							<GoogleMap lat={latitude} lng={longitude} stations={stations} />
						</Col>
					</Row>
				</Spin>
			</React.Fragment>
		);
	}
}
