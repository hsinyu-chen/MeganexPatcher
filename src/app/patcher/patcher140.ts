import {  PatcherDefine, setView } from '../core';
const patcher140: PatcherDefine = ['aec18721ace89241333100573cf944307c5fe4559b796ef858f2e38419ab48a5', '1.4.0.0', (view, res) => {
    //width
    view.setUint8(0x4e353, 0xb8);
    view.setUint16(0x4e354, res * 2, true);
    setView(view, 0x4e356, [0x00, 0x00, 0x90, 0x48, 0x90]);

    //middle point

    view.setFloat32(0x4e391, res, true);
    view.setFloat32(0x4e39c, res, true);

    //height

    view.setUint16(0x4e3ac, res, true);
}]
export default patcher140;