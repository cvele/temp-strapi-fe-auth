module.exports = ({ env }) => ({
    "location-field": {
        enabled: true,
        config: {
            fields: ["photo", "rating"], // optional
            // You need to enable "Autocomplete API" and "Places API" in your Google Cloud Console
            googleMapsApiKey: env("GOOGLE_MAPS_API_KEY"),
            // See https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
            autocompletionRequestOptions: {
                locationBias: 'IP_BIAS',
            },
        },
    },
    //https://market.strapi.io/plugins/strapi-plugin-slugify
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                user: {
                    field: 'slug',
                    references: 'username',
                },
            },
        },
    },
    //https://market.strapi.io/plugins/strapi-plugin-transformer
    transformer: {
        enabled: true,
        config: {}
    },
    //https://market.strapi.io/plugins/strapi-plugin-image-optimizer
    "image-optimizer": {
        enabled: true,
        config: {
            include: ["jpeg", "jpg", "png"],
            exclude: ["gif"],
            formats: ["original", "webp", "avif"],
            sizes: [
                {
                    name: "xs",
                    width: 300,
                },
                {
                    name: "sm",
                    width: 768,
                },
                {
                    name: "md",
                    width: 1280,
                },
                {
                    name: "lg",
                    width: 1920,
                },
                {
                    name: "xl",
                    width: 2840,
                    // Won't create an image larger than the original size
                    withoutEnlargement: true,
                },
                {
                    // Uses original size but still transforms for formats
                    name: "original",
                },
            ],
            additionalResolutions: [1.5, 3],
            quality: 70,
        },
    },
    //https://market.strapi.io/plugins/strapi-plugin-fuzzy-search
    "fuzzy-search": {
        enabled: true,
        config: {
            contentTypes: [
                {
                    uid: "api::author.author",
                    modelName: "author",
                    transliterate: true,
                    fuzzysortOptions: {
                        characterLimit: 300,
                        threshold: -600,
                        limit: 10,
                        keys: [
                            {
                                name: "name",
                                weight: 100,
                            },
                            {
                                name: "description",
                                weight: -100,
                            },
                        ],
                    },
                },
                {
                    uid: "api::book.book",
                    modelName: "book",
                    fuzzysortOptions: {
                        characterLimit: 500,
                        keys: [
                            {
                                name: "title",
                                weight: 200,
                            },
                            {
                                name: "description",
                                weight: -200,
                            },
                        ],
                    },
                },
            ],
        },
    },
    email: {
        config: {
          provider: 'nodemailer',
          providerOptions: {
            host: 'mailhog',
            port: 1025,
            ignoreTLS: true,
          },
        },
      },
    
});

// Configurarion
// USE: https://market.strapi.io/plugins/strapi-plugin-server-route-permission

// For your frontend to have access to the API, enable the following permissions for Ratings from Users & Permissions Plugin on your project settings:

// For public, enable: count, find, getPageSize and getStats.

// For authenticated, enable create, find and getUserReview.
//
