# MCP_API_Client-Server-Telnet-Compatible
MCP API Client Server (Telnet-Compatible)

A CLI-based Postman/cURL clone built with Node.js.
Supports:

Sending HTTP requests (GET, POST, PUT, DELETE)

Managing headers and cookies per session

Logging requests & responses in structured JSON

Telnet-based interface

🚀 Features

✅ Command-line interaction (via Telnet)

✅ Session-based header & cookie management

✅ Structured logging of all requests & responses

✅ Easy debugging & testing of APIs

📂 File Structure
mcp-api-client/
│
├── mcp-api-server.js   # Main server file
├── package.json        # Node.js dependencies & settings
└── README.md           # Documentation

⚙️ Installation

Clone or download this repository.

git clone https://github.com/your-username/mcp-api-client.git
cd mcp-api-client


Initialize Node.js project (if not already):

npm init -y


Install dependencies:

npm install axios tough-cookie axios-cookiejar-support


Make sure your package.json has:

{
  "type": "module",
  "dependencies": {
    "axios": "^1.5.0",
    "axios-cookiejar-support": "^2.0.2",
    "tough-cookie": "^4.1.3"
  }
}

▶️ Running the Server

Start the server:

node mcp-api-server.js


You should see:

🚀 MCP API Server running on port 6000
👉 Connect with: telnet localhost 6000

💻 Connecting via Telnet

Open another terminal and run:

telnet localhost 6000


You should see:

✅ API MCP Server ready. Type HELP.

📜 Commands
Command	Description
HELP	Show available commands
REQUEST <METHOD> <URL> [BODY]	Send an HTTP request (body must be JSON on one line)
SETHEADER <key> <value>	Add custom header to the session
CLEARHEADERS	Remove all custom headers
SHOWSESSION	Display current session state (headers)
EXIT	Close the connection
🧪 Example Usage
1. Show help
HELP

2. Set a header
SETHEADER Authorization Bearer mytoken123

3. Check session headers
SHOWSESSION


Output:

📦 Current Session:
{
  "Authorization": "Bearer mytoken123"
}

4. Send a GET request
REQUEST GET https://jsonplaceholder.typicode.com/posts/1


Output:

{
  "request": {
    "method": "GET",
    "url": "https://jsonplaceholder.typicode.com/posts/1",
    "headers": {
      "Authorization": "Bearer mytoken123"
    },
    "body": null
  },
  "response": {
    "status": 200,
    "headers": { ... },
    "data": {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "..."
    }
  }
}

5. Send a POST request
REQUEST POST https://jsonplaceholder.typicode.com/posts {"title":"Hello","body":"World","userId":1}

6. Clear headers
CLEARHEADERS
SHOWSESSION

7. Exit
EXIT

📌 Notes

Bodies for POST/PUT must be valid JSON and on a single line.

All logs are stored in memory per Telnet session (session.logs).

