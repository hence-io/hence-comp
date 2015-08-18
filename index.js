import {HenceModel} from './lib/HenceModel';
import {HenceSchema} from './lib/HenceSchema';
import {HenceUi} from './lib/HenceUi';
import {HenceHook} from './lib/HenceHook';

let Hence = {
  Model: HenceModel,
  Schema: HenceSchema,
  Ui: HenceUi,
  Hook: HenceHook
};

export {HenceModel,HenceSchema,HenceUi,HenceHook}
export default Hence;
