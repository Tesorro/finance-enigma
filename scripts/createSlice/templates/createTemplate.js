const fs = require('fs/promises');
const resolveRoot = require('../../../../../../../../Downloads/8b0e8b5b6845b35b2a939a4243ba2158/production-project-34d63831ed3896572ee2dfdbb3dee673a317c629/scripts/createSlice/resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot('src', layer, sliceName));
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`);
  }

  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
