export function getAllShops() {
    const url = 'http://localhost:8000/shops/'
    return fetch(url).then(response => response.json())
        .catch(error => console.log(error))
}

export function getShop(text: string) {
    const url = 'http://localhost:8000/shops/?search=' + text
    return fetch(url).then(response => response.json())
        .catch(error => console.log(error))
}