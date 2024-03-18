const http = require('http');
const fs = require('fs');
const url = require('url');

// Function to read visit count from file
function readVisitCount(visits) {
    try {
        return parseInt(fs.readFileSync(visits, 'utf8'));
    } catch (err) {
        // If the file doesn't exist, return 0
        return 0;
    }
}

// Function to write visit count to file
function writeVisitCount(visits, count) {
    fs.writeFileSync(visits, count.toString(), 'utf8');
}

// Function to handle requests
function handleRequest(req, res) {
    const path = url.parse(req.url).visits.txt;

    if (path === '/visits') {
        // Increment visit count
        let viisits = readVisitCount('visits.txt');
        viisits++;
        writeVisitCount('visits.txt', viisits);

        // Send response
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Total visits: ${viisits}`);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}

// Create server
const server = http.createServer(handleRequest);

// Start server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
