declare interface HTMLDialogElement extends HTMLElement {

    open: boolean

    returnValue: string;

    close(returnValue?: string): void

    show(): void

    showModal(): void
}