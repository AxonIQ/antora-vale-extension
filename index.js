module.exports.register = function ({ config }) {
    const execSync = require('child_process').execSync;
    const { valeConfig, updateStyles } = config
    const logger = this.getLogger('vale-extension')

    this.on('sitePublished', () => {

        var command = "vale --no-wrap --sort build";
        var syncCommand = "vale sync";
        if (valeConfig) {
            command = `vale --no-wrap --sort --config ${valeConfig} build`;
            syncCommand = `vale --config ${valeConfig} sync`;
        }

        if (updateStyles) {
            logger.info("updating external styles");
            try {
                execSync(syncCommand, { stdio: 'inherit' });
            } catch (err) {
                logger.debug(err);
                this.stop(1);
            }
        }
        logger.info("checking for writing style issues...");
        logger.debug(`running "${command}"`);
        var time = new Date();
        try {
            execSync(command, { stdio: 'inherit' });
        } catch (err) {
            logger.debug(err);
            this.stop(1);
        } finally {
            time = (new Date() - time) / 1000
            logger.info("writing style check completed in %s seconds", time);
        }
    })
}


