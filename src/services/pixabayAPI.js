import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.timeout = 2000;

axios.defaults.params = {
  key: '24000598-4cbb5e18617bf8e66757f824b',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export default async function axiosFetch(q = '', page = 1) {
  try {
    const { data } = await axios.get('', { params: { q, page } });

    return data.hits;
  } catch (error) {
    console.error(error);
  }
}
