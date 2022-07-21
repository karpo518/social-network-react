export const showPopup = (message) => {
    new Promise((resolve, reject) => { reject({message: message}) })
}