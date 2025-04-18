import { PatcherDefine, PatcherMap } from "../core";
const patchers: PatcherMap = {}
const addPatcher = ([hash, version, patcher]: PatcherDefine) => {
    patchers[hash] = [version, patcher];
}
//import all patchers
import patcher140 from './patcher140';
addPatcher(patcher140)

import patcher1421 from './patcher1421';
addPatcher(patcher1421)

//end

export default patchers;