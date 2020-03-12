import cities from './cities.json';
import countries from './countries.json';
import states from './states.json';

export const getCountries = () => {
	return countries;
};

export const getStates = countryId => {
	return states.filter(state => state.countryID === countryId);
};

export const getCities = stateId => {
	return cities.filter(city => city.stateID === stateId);
};
