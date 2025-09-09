# 📡 **MCP API Client Server (Telnet-Compatible)**

A **CLI-based Postman/cURL clone** built with Node.js.  
Supports sending HTTP requests, managing sessions, and logging requests/responses in structured JSON format.

---

## 🚀 **Features**
- ✅ Send HTTP requests (`GET`, `POST`, `PUT`, `DELETE`)  
- ✅ Manage headers and cookies per session  
- ✅ Structured logging of all requests & responses  
- ✅ Simple CLI interface (via Telnet)  

---

## 📂 **Project Structure**
mcp-api-client/

|

├── mcp-api-server.js               # Main server file

├── package.json                    # Node.js dependencies & settings

└── README.md                       # Documentation



---

## ⚙️ **Installation**

## 1️⃣ **Clone the Repository**

    git clone https://github.com/your-username/mcp-api-client.git
    cd mcp-api-client
## 2️⃣ Initialize Node.js Project

    npm init -y
## 3️⃣ Install Dependencies

    npm install axios tough-cookie axios-cookiejar-support
## 4️⃣ Update package.json
    Make sure it has "type": "module" so ES Modules (import) work:


    {
      "name": "mcp-api-client",
      "version": "1.0.0",
      "type": "module",
      "dependencies": {
        "axios": "^1.5.0",
        "axios-cookiejar-support": "^2.0.2",
        "tough-cookie": "^4.1.3"
      }
    }
## ▶️ Running the Server
Start the server:


    node mcp-api-server.js
### Expected output:


    MCP API Server running on port 6000

    Connect with: telnet localhost 6000

    Connect via Telnet
### Open another terminal and connect:


    telnet localhost 6000
### You should see:

✅ API MCP Server ready. Type HELP.

📜 Available Commands
Command	Description
HELP	Show all available commands
REQUEST <METHOD> <URL> [BODY]	Send an HTTP request (body must be JSON on one line)
SETHEADER <key> <value>	Add a custom header to the session
CLEARHEADERS	Remove all custom headers
SHOWSESSION	Display current session state (headers)
EXIT	Close the connection

🧪 Example Usage
### 1. Show help

        HELP
### 2. Set a header

       SETHEADER Authorization Bearer mytoken123
### 3. Show session

        SHOWSESSION
### Output:


📦 Current Session:
{
  "Authorization": "Bearer mytoken123"
}
### 4. Send a GET request

          REQUEST GET https://jsonplaceholder.typicode.com/posts/1
Example response:


{
  "request": {
    "method": "GET",
    "url": "https://jsonplaceholder.typicode.com/posts/1",
    "headers": {},
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
### 5. Send a POST request

            REQUEST POST https://jsonplaceholder.typicode.com/posts {"title":"Hello","body":"World","userId":1}
### 6. Clear headers
            CLEARHEADERS
            SHOWSESSION
### 7. Exit session

            EXIT



