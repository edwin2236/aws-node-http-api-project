const VALID_PROFILES = ['ADMIN', 'SUPER_ADMIN']
const NORMALIZE_BEARER_TOKEN = 7
const ACCESS_ACTION = {
  allow: 'Allow',
  deny: 'Deny'
}

const generatePolicy = (principalId, effect, resource, customErrorMessage = null) => {
  const authResponse = { principalId }

  if (effect && resource) {
    const Statement = [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    }]
    const policyDocument = { Version: '2012-10-17', Statement }

    authResponse.policyDocument = policyDocument
  }

  if (effect.toLowerCase() === ACCESS_ACTION.deny && customErrorMessage != null) {
    authResponse.context = {
      customErrorMessage
    }
  }

  return authResponse
}

const validateSession = (event, _context, callback) => {
  try {
    const token = event.authorizationToken
    const { user, profile } = JSON.parse(token.substr(NORMALIZE_BEARER_TOKEN))

    if (VALID_PROFILES.includes(profile.toUpperCase())) {
      callback(null, generatePolicy(user, ACCESS_ACTION.allow, event.methodArn))
    } else {
      callback(null, generatePolicy(user, ACCESS_ACTION.deny, event.methodArn, 'Unauthorized'))
    }
  } catch (error) {
    throw new Error('Invalid Token')
  }
}

module.exports = { validateSession }
