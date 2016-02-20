var env_config = require('./env-config.js');
var base_url;

switch(env_config.env) {
    case 'local':
        base_url = "http://127.0.0.1:8080/api/v1/";
        break;
    case 'dev':
        base_url = "https://dev-api-0.newtopia.com/api/v1/";
        break;
    case 'stg':
        base_url = "https://stg-api.newtopia.com/api/v1/";
        break;
    case 'prd':
        base_url = "https://prd-api.newtopia.com/api/v1/";
        break;
    default:
        base_url = "https://prd-api.newtopia.com/api/v1/";
}

module.exports = {
	DATE_PICKER_MIN_DATE_DEFAULT: new Date(2014,12,20),
	DATE_PICKER_MAX_DATE_DEFAULT: new Date(),
        BASE_URL: base_url,
	ENV: env_config.env,
	DEV_ROUTES: true

};


