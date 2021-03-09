const test = require('tape');
const app = require('./lib');

test('Do a search', (t) => {
    let searched = "test";
    app.search(searched).then(response => {
        t.isNotDeepEqual(response, {})
        t.end()  
    });
})

test('Do a search with empty search string', (t) => {
    t.deepEqual(app.search(""), 
        {
            error: true,
            httpCode: 502,
            message: 'The search parameter is required'
       })
    t.end()  
})

test('Next Page', (t) => {
    let searched = "test";
    app.search(searched).then(response => {
        const nextPageToken = response.nextPageToken;
        app.nextpage(searched, nextPageToken).then(nextResponse => {
            t.isNotDeepEqual(nextResponse, {})
            t.end()
        })
    })
})

test('Previous Page', (t) => {
    let searched = "test";
    app.search(searched).then(response => {
        const nextPageToken = response.nextPageToken;
        app.nextpage(searched, nextPageToken).then(nextResponse => {
            const prevPageToken = nextResponse.prevPageToken;
            app.previouspage(searched, prevPageToken).then(prevResponse => {
                t.isNotDeepEqual(prevResponse, {})
                t.end()
            })
        })
    })
})
