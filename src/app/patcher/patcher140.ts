import { hex, PatcherDefine, setView } from '../core';
const patcher14factory: PatcherDefine = ['aec18721ace89241333100573cf944307c5fe4559b796ef858f2e38419ab48a5', '1.4.0.0', (view, res) => {
    //width
    view.setUint8(hex('0x4e353'), hex('0xb8'));
    view.setUint16(hex('0x4e354'), res * 2, true);
    setView(view, hex('0x4e356'), [hex('0x00'), hex('0x00'), hex('0x90'), hex('0x48'), hex('0x90')]);

    //middle point

    view.setFloat32(hex('0x4e391'), res, true);
    view.setFloat32(hex('0x4e39c'), res, true);

    //height

    view.setUint16(hex('0x4e3ac'), res, true);
}]
export default patcher14factory;