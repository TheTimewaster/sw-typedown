declare interface HTMLMaterialSnackbar extends HTMLElement
{
    MaterialSnackbar: MaterialSnackbar
}

declare type MaterialSnackbar = {
    showSnackbar(data: SnackbarData)
}

declare type SnackbarData = {
    message: string
    timeout?: number
    actionHandler?: Function
    actonText?: string
}