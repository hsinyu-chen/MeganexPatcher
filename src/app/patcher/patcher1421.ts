import {  PatcherDefine, setView } from '../core';
const patch1421: PatcherDefine = ['0840a6affb3744fa18de90dcfe4cdc052d74fe954935a41d5d50f4dfad1b142e', '1.4.2.1', (view, res) => {
    //width
    view.setUint8(0x4e233, 0xb8);
    view.setUint16(0x4e234, res * 2, true);
    setView(view, 0x4e236, [0x00, 0x00, 0x90, 0x48, 0x90]);

    //middle point

    view.setFloat32(0x4e265, res, true);
    view.setFloat32(0x4e270, res, true);

    //height

    view.setUint16(0x4e280, res, true);
}]
export default patch1421;