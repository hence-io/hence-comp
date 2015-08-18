/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

# Hence Component Framework

>

## About

Hence Component Framework is built on top of Polymer, designed to provide some essential standards to
the types of components to be based off of, and other essential helpers and tools to build better components.

The Component Framework is built in ES6 to leverage the latest benefits of native javascript, providing a streamlined
way to create and utilize Polymer components, sanitizing them to make sure they're sound, and allow for easier
debugging as required.

*/

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
