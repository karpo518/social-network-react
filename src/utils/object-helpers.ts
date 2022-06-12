export const updateObjectInArray = (items: any, itemIdName: any, itemIdValue: any, newObjProps: any) => {

    return items.map((i: any) => {
        if(i[itemIdName] === itemIdValue) {
            return {...i, ...newObjProps};
        }
        return i;
    })
}

