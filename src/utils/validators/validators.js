export const required = (value) => {
    console.log('required')
    if(value && value !== '') {
        return undefined
    }

    return 'It is required field!'
}

export const maxLength = (maxLengthValue) => {
    return (value) => {
        if(value && value.length > maxLengthValue) {
            return `You have exceeded the maximum message length(${maxLengthValue})`
        }
        
        return undefined
    }
}