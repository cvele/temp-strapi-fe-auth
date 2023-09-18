"use strict";

const { errors } = require('@strapi/utils');
const { PolicyError } = errors;

/**
 * `isMe` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  strapi.log.info("In isMe policy.");
  const { user, auth } = policyContext.state;
  const { params } = policyContext;
  const canDoSomething = user.id == params.id;
  strapi.log.info(user.id);
  strapi.log.info(params.id);

  if (!canDoSomething) { throw new PolicyError('You must be the owner of the entity to do this.', { policy: 'isMe' }) } else { return true; }
};
