//----favourite functions--------
export function mergeFaves(fetchedFaves) {
    const faves = JSON.parse(localStorage.getItem('faves')) || [];
    for (const fave of fetchedFaves) {
        if (!faves.includes(fave)) {
            faves.push(fave)
        }
    }

    localStorage.setItem('faves', JSON.stringify(faves));
    dispatchEvent(new Event('storage'))

    return faves;
}

export function getFave() {
    const faves = localStorage.getItem('faves');
    return JSON.parse(faves)
}

export function addFave(id) {
    let new_list = [];
    const faves = JSON.parse(localStorage.getItem('faves'));
    if (faves) {
        if (faves.includes(id)) new_list = faves
        else new_list = [...faves, id]
    } else new_list.push(id);

    localStorage.setItem('faves',JSON.stringify(new_list));

    return new_list;
}

export function removerFave(id) {
    const faves = JSON.parse(localStorage.getItem('faves'));

    const new_list =  faves.filter(fave => fave !== id)

    localStorage.setItem('faves', JSON.stringify(new_list))
    return new_list;
}

export function clearFave() {
    localStorage.setItem('faves', '[]');
}

//----cart functions---------
export function mergeCart(fetchedCart) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    for (const item of fetchedCart ) {
        if (!cart.map(item_ => item_.id).includes(item.id)){
            cart.push(item)
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    return cart;
}
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

    localStorage.setItem('cart',JSON.stringify(new_list));

    return new_list;
}

export function updateCart(id, data){
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++ ) {
        if (cart[i]._id == id)  { 
            cart[i].data = data;
            break;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    return cart;
}

export function removeCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const new_list =  cart.filter((_cart) => _cart._id !== id)

    localStorage.setItem('cart', JSON.stringify(new_list))
    return new_list;
}

export function checkOut() {
    localStorage.setItem('cart', '[]')
}



