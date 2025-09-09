#!/usr/bin/env node
/**
 * MCP API Client Server (Telnet Compatible)
 * - Acts like CLI-based Postman/cURL
 * - Supports GET/POST/PUT/DELETE requests
 * - Manages session headers/cookies
 * - Logs all requests & responses
 *
 * Usage:
 *   1. Run: node mcp-api-server.js
 *   2. In another terminal: telnet localhost 6000
 */

import net from "net";
import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

const jar = new CookieJar(); // shared cookie jar
const client = wrapper(axios.create({ jar }));

// Create per-session state
function createSession() {
  return {
    headers: {}, // custom headers
    logs: [],
    websocket: null,
  };
}

// Help text
function helpText() {
  return `
Supported commands:
  REQUEST <METHOD> <URL> [BODY]  - Send HTTP request
  SETHEADER <key> <value>        - Set header for session
  CLEARHEADERS                   - Remove all custom headers
  SHOWSESSION                    - Show current session state
  HELP                           - Show help
  EXIT                           - Close connection
`;
}

// TCP server
const server = net.createServer((socket) => {
  const session = createSession();
  socket.setEncoding("utf8");

  socket.write("✅ API MCP Server ready. Type HELP.\n");

  let buffer = "";

  socket.on("data", async (chunk) => {
    buffer += chunk;
    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const raw = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!raw) continue;

      const parts = raw.split(" ");
      const cmd = parts[0].toUpperCase();

      try {
        if (cmd === "HELP") {
          socket.write(helpText() + "\n");

        } else if (cmd === "SETHEADER") {
          if (parts.length < 3) {
            socket.write("❌ Usage: SETHEADER <key> <value>\n");
            continue;
          }
          const key = parts[1];
          const value = parts.slice(2).join(" ");
          session.headers[key] = value;
          socket.write(`✅ Header set: ${key}=${value}\n`);

        } else if (cmd === "CLEARHEADERS") {
          session.headers = {};
          socket.write("✅ All headers cleared\n");

        } else if (cmd === "SHOWSESSION") {
          socket.write("📦 Current Session:\n" + JSON.stringify(session.headers, null, 2) + "\n");

        } else if (cmd === "REQUEST") {
          if (parts.length < 3) {
            socket.write("❌ Usage: REQUEST <METHOD> <URL> [BODY]\n");
            continue;
          }
          const method = parts[1].toUpperCase();
          const url = parts[2];
          const body = parts.slice(3).join(" ") || null;

          socket.write(`🌍 Sending ${method} ${url}\n`);

          try {
            const res = await client({
              method,
              url,
              headers: session.headers,
              data: body ? JSON.parse(body) : undefined,
            });

            const logEntry = {
              request: { method, url, headers: session.headers, body },
              response: { status: res.status, headers: res.headers, data: res.data },
            };
            session.logs.push(logEntry);

            socket.write("✅ Response:\n" + JSON.stringify(logEntry, null, 2) + "\n");
          } catch (e) {
            socket.write("❌ Error: " + e.message + "\n");
          }

        } else if (cmd === "EXIT") {
          socket.write("👋 Closing connection...\n");
          socket.end();

        } else {
          socket.write(`❌ Unknown command: ${cmd}\n`);
        }

      } catch (err) {
        socket.write("❌ Error: " + err.message + "\n");
      }
    }
  });
});

const PORT = 6000;
server.listen(PORT, () => {
  console.log(`🚀 MCP API Server running on port ${PORT}`);
  console.log(`👉 Connect with: telnet localhost ${PORT}`);
});
