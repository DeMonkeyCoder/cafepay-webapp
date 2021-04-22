const { join } = require('path')

module.exports = {
    apps: [
        {
            name: 'Front Cafepay',
            script          : "./node_modules/nuxt-start/bin/nuxt-start.js",
            exec_mode       : "cluster",
            watch           : false,
            instances       : "3",
            merge_logs      : true,
            log_type        : "raw",
                cwd: "./",
                args: `-c ${join(__dirname, 'nuxt.config.js')}`
        }
    ]
}