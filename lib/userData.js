import { getToken } from "./authenticate";

export async function addToFavourites(id) {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${token}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function removeFromFavourites(id) {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${token}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function getFavourites() {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        headers: {
            'Authorization': `JWT ${token}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function addToHistory(id) {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${token}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function removeFromHistory(id) {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${token}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function getHistory() {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        headers: {
            'Authorization': `JWT ${token}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}