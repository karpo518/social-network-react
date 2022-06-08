export type FieldValidatorType = (field: string) => string | undefined

export const required: FieldValidatorType = (value: string): string | undefined => {
    if(value && value !== '') {
        return undefined
    }

    return 'It is required field!'
}

export const maxLength = (maxLengthValue: number): FieldValidatorType => {
    return (value) => {
        if(value && value.length > maxLengthValue) {
            return `You have exceeded the maximum message length(${maxLengthValue})`
        }
        
        return undefined
    }
}