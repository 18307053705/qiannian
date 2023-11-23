import { isDanYao, isEquip, isMaterial, isReel, isTask } from '@utils/article';

export function dataChange(data) {
    const list = data.list.map(({ id, ...item }, index) => {
        if (isEquip(id)) {
            return {
                ...item,
                id,
                p: 1,
                in_x: index,
                isEquip:true
            }
        }
        if (isDanYao(id)) {
            return {
                ...item,
                id,
                p: 2,
                in_x: index
            }
        }
        if (isReel(id)) {
            return {
                ...item,
                id,
                p: 3,
                in_x: index
            }
        }
        if (isMaterial(id)) {
            return {
                ...item,
                id,
                p: 4,
                in_x: index
            }
        }
        if (isTask(id)) {
            return {
                ...item,
                id,
                p: 5,
                in_x: index
            }
        }
        return {
            ...item,
            id,
            p: 6,
            in_x: index
        }
    })
    return {
        ...data,
        list
    }
}
