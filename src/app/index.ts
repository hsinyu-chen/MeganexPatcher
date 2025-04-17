import '../public/index.scss'
import { calculateHash, delay, PatcherDefine, PatcherMap, readFile } from "./core";
import { MessageLogger } from "./log";
import {
    BlobReader,
    BlobWriter,
    TextReader,
    TextWriter,
    ZipReader,
    ZipWriter,
} from "@zip.js/zip.js";
//patchers
import patcher140 from './patcher/patcher140';

(async () => {
    const patchers: PatcherMap = {}
    const addPatcher = ([hash, version, patcher]: PatcherDefine) => {
        patchers[hash] = [version, patcher];
    }
    //import all patchers

    addPatcher(patcher140)

    //end
    const logger = new MessageLogger(document.querySelector('.messages')!)
    const resInput = document.querySelector<HTMLInputElement>('input#s1')!;
    const patch = async (buffer: ArrayBuffer) => {
        logger.clear();
        const hash = await calculateHash(buffer);
        if (hash in patchers) {
            const [version, patcher] = patchers[hash]
            logger.appendMessage(`version matched: ${version}`);
            await delay(1);
            logger.appendMessage(`starting patch...`);
            try {
                const dst = new ArrayBuffer(buffer.byteLength);
                new Uint8Array(dst).set(new Uint8Array(buffer));
                const view = new DataView(buffer);
                const res = correctNumber(resInput);
                await patcher(view, res);
                logger.appendMessage(`patch end.`);
                logger.appendMessage(`creating zip...`);
                const zipFileWriter = new BlobWriter();
                const zipWriter = new ZipWriter(zipFileWriter);
                await zipWriter.add('MeganeX_Compositor.exe', new Blob([view]).stream());
                await zipWriter.add('MeganeX_Compositor_patch_backup/MeganeX_Compositor.exe', new Blob([dst]).stream());
                await zipWriter.close();
                const zipFileBlob = await zipFileWriter.getData();
                logger.appendMessage(`start download.`);
                const a = document.createElement('a')
                a.href = URL.createObjectURL(zipFileBlob)
                a.download = `MeganeX_Compositor.${res}.zip`;
                a.click();
                logger.appendMessage(`please unzip to your meganex folder.`, 'green');
            } catch (er) {
                logger.appendMessage(`unexpect error,${er}`, 'red')
            }
        } else {
            logger.appendMessage(`no avalible patch found [${hash}]`, 'red')
        }
    }
    resInput.addEventListener('change', e => {
        const input = e.target as HTMLInputElement;
        correctNumber(input);
    });
    document.querySelector('input#f1')?.addEventListener('change', async e => {
        const fileInput = e.target as HTMLInputElement
        if (fileInput) {
            var file = fileInput.files?.[0];
            if (file) {
                fileInput.classList.toggle('hide', true);
                try {
                    const buffer = await readFile(file);
                    await patch(buffer);
                } finally {
                    fileInput.classList.toggle('hide', false);
                }
            }
            fileInput.value = '';
        }
    });
})();


function correctNumber(input: HTMLInputElement) {
    let value = input.value;
    if (!/^\d+$/.test(value)) {
        value = '7000';
    }
    const iv = parseInt(value, 10);
    if (iv > 8000) {
        value = '8000';
    }
    if (iv < 4084) {
        value = '4084';
    }
    if (input.value != value) {
        input.value = value;
    }
    return parseInt(value, 10);
}

