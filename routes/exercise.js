const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
  params: {limit: '1'},
  headers: {
    'X-RapidAPI-Key': '7fc2afadc8msha5dc7a69ae98b33p132eaajsne6c3773814cf',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}