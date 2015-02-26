'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "cornerfind-secret",

 TWITTER_ID:       'JYxJHKFAxRyH0k0v1z4lS7FpY',
 TWITTER_SECRET:   'BbKh9YQPN2k77sz02C70Iz5kHHH6yfXZPRdKWnOIlQMm3JqHC6',

 FACEBOOK_ID:      '367680433419484',
 FACEBOOK_SECRET:  '8eaa33476bd38badf1b8463592569079',

 GOOGLE_ID:        '4236444521-fmqr66i8ef7qlb9ho7esldtullchkt24.apps.googleusercontent.com',
 GOOGLE_SECRET:    'oUMispzujvMK7KOwu5tE22BX',

  TWILIO_ACCOUNT_SID: 'AC065d1a64e1e3baf863d35c46ce7e3aef',
  TWILIO_AUTH_TOKEN: '6d994780ae0aebbd3457ecca78a25d39',

  MANDRILL_API_KEY: 'VdEEYnce5HV7U_I_U30Qfg',

  AWS_ACCESS_KEY_ID: 'AKIAJPA6UBJIDYB4RGEQ',
  AWS_SECRET_ACCESS_KEY: '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',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
