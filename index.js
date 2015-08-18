import {HenceModel} from './lib/model';
import {HenceSchema} from './lib/schema';
import {HenceUi} from './lib/ui';
import {HenceHook} from './lib/hook';

let Hence = {
  Model: HenceModel,
  Schema: HenceSchema,
  Ui: HenceUi,
  hook: HenceHook
};

export {HenceModel,HenceSchema,HenceUi,HenceHook}
export default Hence;
