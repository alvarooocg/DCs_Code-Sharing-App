const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = config.PORT || 3001

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`)
    })
}

module.exports = app