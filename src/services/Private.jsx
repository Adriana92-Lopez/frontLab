import { route } from './OriginURL'

export async function GetRoute(url) {
    const response = await fetch(`${route}${url}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer `
        }
    })
        .then(function (data) {
            return data.json()
        })
        .catch(function (data) {
            return []
        })
    return await response
}

export async function PostRoute(url, form) {

    const data = JSON.stringify({
        // id_usuarios: JSON.parse(localStorage.getItem("authLab"))?.id,
        id_usuarios: 1,
        ...form
    })

    const response = await fetch(`${route}${url}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer  `
        },
        body: data
    })
        .then(function (data) {
            return data.json()
        })
        .catch(function (data) {
            return []
        })

    return await response
}

export default {
    GetRoute,
    PostRoute
}
