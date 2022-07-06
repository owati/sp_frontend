//----favourite functions--------
export function getFave() {
    const faves = localStorage.getItem('faves')
    return JSON.parse(faves)
}

export function addFave(id) {
    let new_list = [];
    const faves = JSON.parse(localStorage.getItem('faves'));
    if (faves) {
        new_list = [...faves, id]
    } else new_list.push(id);

    localStorage.setItem(JSON.stringify(new_list));

    return new_list;
}

export function removerFave(id) {
    const faves = JSON.parse(localStorage.getItem('faves'));

    const new_list =  faves.filter(fave => fave !== id)

    localStorage.setItem('faves', JSON.stringify(new_list))
    return new_list;
}

//----cart functions---------
export function getCart() {
    const cart = localStorage.getItem('cart')
    return JSON.parse(cart)
}

export function addCart(sku) {
    let new_list = [];
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        new_list = [...cart, sku]
    } else new_list.push(sku);

    localStorage.setItem(JSON.stringify(new_list));

    return new_list;
}

export function removeCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const new_list =  cart.filter(sku => sku.id !== id)

    localStorage.setItem('cart', JSON.stringify(new_list))
    return new_list;
}

export function checkOut() {
    localStorage.setItem('cart', '[]')
}



