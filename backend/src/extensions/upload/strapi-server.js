module.exports = (plugin) => {
    const imageOptimizerService = require("strapi-plugin-image-optimizer/dist/server/services/image-optimizer-service");
    plugin.services["image-manipulation"] = imageOptimizerService;
    return plugin;
};
