export const updateObjectInArray = (items, itemIdName, itemIdValue, newObjProps) => {

    return items.map((i) => {
        if(i[itemIdName] === itemIdValue) {
            return {...i, ...newObjProps};
        }
        return i;
    })
}

