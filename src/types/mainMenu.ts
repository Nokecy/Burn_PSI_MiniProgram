interface Menu {
    image: string
    value: string
    url:string
}
export default interface MainMenu {
    title: string
    menus: Menu[]
}