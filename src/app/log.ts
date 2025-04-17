export class MessageLogger {
    constructor(private element: HTMLElement) {

    }
    clear() {
        this.element.innerHTML = ''
    }
    appendMessage(message: string, cssClass?: string) {
        const e = document.createElement('div');
        e.innerText = message;
        if (cssClass) {
            e.className = cssClass;
        }
        this.element.append(e);
    }
}