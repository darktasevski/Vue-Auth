import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://vue-axios-combo.firebaseio.com',
});

instance.defaults.headers.common['SOMETHING'] = 'sOMETHING';

export default instance;
