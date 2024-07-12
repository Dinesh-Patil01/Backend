const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = path.join(__dirname, 'sample-dir');  // Base directory to serve files from
const ICONS = {
    folder: '📁',
    file: '🖹'
};

// Helper function to generate HTML for directory listing
const generateDirectoryListing = (dirPath, items) => {
    const listItems = items.map(item => {
        const itemPath = path.join(dirPath, item);
        const isDirectory = fs.lstatSync(itemPath).isDirectory();
        const icon = isDirectory ? ICONS.folder : ICONS.file;
        const href = path.join(reqPath, item).replace(/\\/g, '/');
        return `<li>${icon} <a href="${href}">${item}</a></li>`;
    }).join('');

    return `
        <html>
        <head>
            <title>Directory listing for ${dirPath}</title>
        </head>
        <body>
            <h1>Directory listing for ${dirPath}</h1>
            <ul>${listItems}</ul>
        </body>
        </html>
    `;
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    const reqPath = decodeURIComponent(req.url);
    const filePath = path.join(BASE_DIR, reqPath);

    // Check if the path exists
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    // Check if the path is a directory
    if (fs.lstatSync(filePath).isDirectory()) {
        const items = fs.readdirSync(filePath);
        const html = generateDirectoryListing(reqPath, items);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else {
        // Serve the file content
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(content);
        });
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
