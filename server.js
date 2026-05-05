const express = require("express");
const client = require("prom-client");

const app = express();
const port = 4000;

// Create a Registry to register metrics
const register = new client.Registry();

// Example: Counter metric
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});
register.registerMetric(httpRequestsTotal);

// Middleware to count requests
app.use((req, res, next) => {
  httpRequestsTotal.inc();
  next();
});

// Normal endpoint
app.get("/", (req, res) => {
  res.send("Hello from Node.js inside Docker!");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
