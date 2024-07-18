/** @type {import('next').NextConfig} */
const nextConfig = {};
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
module.exports = nextConfig;
