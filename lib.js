const axios = require('axios');
let api={
  baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
  part: 'snippet',
  type: 'video',
  order: 'viewCount',
  maxResults: 12,
  q: '',
  key: 'AIzaSyBtfXt7c9Bgx7Sj00eL9uFDzrdwlhLng0M',
  prevPageToken: '',
  nextPageToken: ''        
};

function setFormattedSearchParams(searchParams) {
    api.q = searchParams + '+';
}

function search(searchParams){
    if(!searchParams) {
        response = {
         error: true,
         httpCode: 502,
         message: 'The search parameter is required'
        };
        return response;
    } else {
        setFormattedSearchParams(searchParams)
        const { baseUrl, part, type, order, maxResults, q, key } = api;
        const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
        return getData(apiUrl);
    }
}

function previouspage(searchParams, prevPageToken){
    setFormattedSearchParams(searchParams)
    const { baseUrl, part, type, order, maxResults, q, key } = api;
    const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;
    return getData(apiUrl);
}

function nextpage(searchParams, nextPageToken){
    setFormattedSearchParams(searchParams)
    const { baseUrl, part, type, order, maxResults, q, key } = api;
    const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
    return getData(apiUrl);
}

function getData(apiUrl){
    return axios
        .get(apiUrl)
        .then(res => {
            return {
                videos: res.data.items,
                prevPageToken: res.data.prevPageToken,
                nextPageToken: res.data.nextPageToken,
            }
        })
        .catch(error => console.log(error));
  }
  

module.exports = {search, previouspage, nextpage}
