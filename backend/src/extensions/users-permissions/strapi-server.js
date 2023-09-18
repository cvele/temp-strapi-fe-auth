module.exports = (plugin) => {
    for (let i = 0; i < plugin.routes["content-api"].routes.length; i++) {
      const route = plugin.routes["content-api"].routes[i];
      if (
        route.method === "PUT" &&
        route.path === "/users/:id" &&
        route.handler === "user.update"
      ) {
        console.log(route);
        plugin.routes["content-api"].routes[i] = {
          ...route,
          config: {
            ...route.config,
            policies: route.config.policies
              ? [...route.config.policies, "global::isMe"] // tests if policies were defined
              : ["global::isMe"],
          },
        };
      }
    }
  
    return plugin;
  };
  
  
