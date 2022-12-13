require('dotenv').config({ path: './config/.env' });
const sanityChecks = require('./server/tests/001-test-api');
const userTests = require('./server/tests/002-test-api');

describe('Baseline server sanity checks', sanityChecks);
describe('User test suite', userTests);