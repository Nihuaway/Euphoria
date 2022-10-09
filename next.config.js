/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['localhost']
  },
  env: {
    routes: {
      user: 'http://localhost:5000/api/user',
      shots: 'http://localhost:5000/api/shots',
      collections: 'http://localhost:5000/api/collections',
      auth: 'http://localhost:5000/api/auth'
    }
  },

}
