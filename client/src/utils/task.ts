const data_text = {
    exp: '经验',
    yuanbao: '元宝',
    tael: '银两',
    world: '世界声望',
    gang: '帮会声望',
    intersect: '结义声望',
    exploit: '功勋',
}


export function getTaskReward(reward) {
    const { article = {}, ...data } = reward || {};
    const text = Object.keys(data).map((key) => `${data_text[key]}+${data[key]}`)
    text.push(...Object.values(article).map(({ name, s }: any) => `${name}+${s}`))
    return text;
}