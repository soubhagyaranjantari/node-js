const http = require('http')
const fs = require('fs')

const PORT = 5001
const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end()
    var currentDate = new Date();
    // Get the current hours, minutes, and seconds
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    const url = require("url")
    const myUrl = url.parse(req.url, true)
    const log = `${hours} ${minutes} ${seconds} ${req.url} ${req.method} New Request Recived\n`;
    fs.appendFile('serverlog.txt', log, (err, data) => {

        // console.log(myUrl);
        if (err) {
            console.log(err);
        }
        switch (myUrl.pathname) {
            case '/':
                fs.readFile('./serverlog.txt', 'utf-8', (err, data) => {
                    // console.log(data);
                    res.end(`<pre>${data}</pre>\n`)
                })

                break;

            case '/about':
                res.end(`<h1>${myUrl.query.myName.toUpperCase()}</h1>`)
                break;
            case '/search':
                const search = myUrl.query.search_query;
                console.log(search);
                res.end(search ? '<h1>Here are The Result For ' + search + "</h1>" : null)
                break
            default:
                res.end(`<h1>404 PAGE</h1>`)
                break;
        }


    })
});
myServer.listen(PORT, () => {
    console.log(`Server Listing On Port ${PORT}`);
}
)