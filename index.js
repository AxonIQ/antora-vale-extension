const replaceInFiles = require('replace-in-files');
const execSync = require('child_process').execSync;

class ValeExtension {
  static register ({ config }) {
    return new ValeExtension(this, config)
  }

  constructor (context, config) {
    ;(this.context = context)
      .on('sitePublished', this.onSitePublished.bind(this, context))
      this.valeConfig = config.valeConfig
      this.updateStyles = config.updateStyles
      this.logger = context.getLogger('vale-extension')
    }

  async onSitePublished (context) {
    const options = {
      files: 'build/site/**/*.html',
      from: 'The page you requested has been relocated',
      to: 'The page you requested has new location',
    };
    var time = new Date();
    try {
      this.logger.info("rephrasing redirect messages...");
      const data = await replaceInFiles(options);
    } catch (error) {
      this.logger.debug(err);
      context.stop(1);
    } finally {
      time = (new Date() - time) / 1000
      this.logger.info("rephrasing redirect messages completed in %s seconds", time);
    }

    var command = "vale --no-wrap --sort build";
    var syncCommand = "vale sync";
    if (this.valeConfig) {
        command = `vale --no-wrap --sort --config ${this.valeConfig} build`;
        syncCommand = `vale --config ${this.valeConfig} sync`;
    }

    if (this.updateStyles) {
        this.logger.info("updating external styles");
        try {
            execSync(syncCommand, { stdio: 'inherit' });
        } catch (err) {
            this.logger.debug(err);
            this.stop(1);
        }
    }
    this.logger.info("checking for writing style issues...");
    this.logger.debug(`running "${command}"`);
    var time = new Date();
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (err) {
        this.logger.debug(err);
        context.stop(1);
    } finally {
        time = (new Date() - time) / 1000
        this.logger.info("writing style check completed in %s seconds", time);
    }

  }
}

module.exports = ValeExtension
