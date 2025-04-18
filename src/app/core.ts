export type Patcher = (buffer: DataView, targetRes: number) => Promise<void> | void;

export type PatcherDefine = [hash: string, version: string, Patcher];
export type PatcherMap = { [hash: string]: [version: string, Patcher] };
export function hex(hexstr: string) {
    return parseInt(hexstr.replace(/^0x/, ''), 16);
}
export function setView(view: DataView, start: number, values: number[]) {
    let offset = start;
    for (let n of values) {
        view.setUint8(offset, n);
        offset += 1;
    }
}
export async function calculateHash(data: BufferSource) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}
export const readFile = (blob: File | Blob): Promise<ArrayBuffer> => {
    return new Promise((done, rej) => {
        const reader = new FileReader();
        reader.addEventListener('load', e => {
            const buffer = e.target?.result as ArrayBuffer;
            done(buffer);
        });
        reader.addEventListener('error', e => {
            rej(e.target?.error);
        });
        reader.readAsArrayBuffer(blob);
    })
}
