module.exports = {
    effect1Add: function (effect, attr, base) {
        const [key, type, value] = effect.split('-');
        return {
            ...this[key](Number(value), attr, type, base),
            key
        }
    },
    // 计算百分百属性，生命与法力一定是按最大值计算
    getValue: function (key, value, type, base) {
        return type == '0' ? base[key] * value / 100 : value;
    },
    // 生命
    life_max: function (value, attr, type, base) {
        const add = this.getValue('life_max', value, type, base);
        attr['life_max'] += add;
        attr['life'] += add;
        return {
            text: `生命上限+${add}`,
            value: add,
            attr
        };
    },
    life: function (value, attr, type, base) {
        const add = this.getValue('life_max', value, type, base);
        attr['life'] += add;
        return {
            text: `生命+${add}`,
            value: add,
            attr
        };
    },
    // 法力
    mana_max: function (value, attr, type, base) {
        const add = this.getValue('mana_max', value, type, base);
        attr['mana_max'] += add;
        attr['mana'] += add;
        return {
            text: `法力上限+${add}`,
            value: add,
            attr
        };
    },
    mana: function (value, attr, type, base) {
        const add = this.getValue('mana_max', value, type, base);
        attr['mana'] += add;
        return {
            text: `法力+${add}`,
            value: add,
            attr
        };
    },
    // 攻击
    atk: function (value, attr, type, base) {
        const add_max = this.getValue('atk_max', value, type, base);
        const add_min = this.getValue('atk_min', value, type, base);
        attr['atk_max'] += add_max;
        attr['atk_min'] += add_min;
        return {
            text: `最小攻击+${add_min},最大攻击+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    atk_max: function (value, attr) {
        const add_max = this.getValue('atk_max', value, type, base);
        attr['atk_max'] += add_max;
        return {
            text: `最大攻击+${add_max}`,
            value: add_max,
            attr
        };
    },
    atk_min: function (value, attr, type, base) {
        const add_min = this.getValue('atk_min', value, type, base);
        attr['atk_min'] += add_min;
        return {
            text: `最小攻击+${add_min}`,
            value: add_min,
            attr
        };

    },
    // 防御
    dfs: function (value, attr, type, base) {
        const add_max = this.getValue('dfs_max', value, type, base);
        const add_min = this.getValue('dfs_min', value, type, base);
        attr['dfs_max'] += add_max;
        attr['dfs_min'] += add_min;
        return {
            text: `最小防御+${add_min},最大防御+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    dfs_max: function (value, attr, type, base) {
        const add_max = this.getValue('dfs_max', value, type, base);
        attr['dfs_max'] += add_max;
        return {
            text: `最大防御+${add_max}`,
            value: add_max,
            attr
        };
    },
    dfs_min: function (value, attr, type, base) {
        const add_min = this.getValue('dfs_min', value, type, base);
        attr['dfs_min'] += add_min;
        return {
            text: `最大防御+${add_min}`,
            value: add_min,
            attr
        };
    },
    // 命中
    hit: function (value, attr, type, base) {
        const add = this.getValue('hit', value, type, base);
        attr['hit'] += add;
        return {
            text: `命中+${add}`,
            value: add,
            attr
        };
    },
    // 闪避
    dodge: function (value, attr, type, base) {
        const add = this.getValue('dodge', value, type, base);
        attr['dodge'] += add;
        return {
            text: `闪避+${add}`,
            value: add,
            attr
        };
    },
    // 暴击
    sudden: function (value, attr, type, base) {
        const add = this.getValue('sudden', value, type, base);
        attr['sudden'] += add;
        return {
            text: `暴击+${add}`,
            value: add,
            attr
        };
    },
    // 冰元素
    ice_atk: function (value, attr, type, base) {
        const add_max = this.getValue('ice_atk_max', value, type, base);
        const add_min = this.getValue('ice_atk_min', value, type, base);
        attr['ice_atk_max'] += add_max;
        attr['ice_atk_min'] += add_min;
        return {
            text: `最小冰攻+${add_min},最大冰攻+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    ice_atk_max: function (value, attr) {
        const add_max = this.getValue('ice_atk_max', value, type, base);
        attr['ice_atk_max'] += add_max;
        return {
            text: `最大冰攻+${add_max}`,
            value: add_max,
            attr
        };
    },
    ice_atk_min: function (value, attr, type, base) {
        const add_min = this.getValue('ice_atk_min', value, type, base);
        attr['ice_atk_min'] += add_min;
        return {
            text: `最小冰攻+${add_max}`,
            value: add_max,
            attr
        };
    },
    ice_dfs: function (value, attr, type, base) {
        const add_max = this.getValue('ice_dfs_max', value, type, base);
        const add_min = this.getValue('ice_dfs_min', value, type, base);
        attr['ice_dfs_max'] += add_max;
        attr['ice_dfs_min'] += add_min;
        return {
            text: `最小冰防+${add_min},最大冰防+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    ice_dfs_max: function (value, attr) {
        const add_max = this.getValue('ice_dfs_max', value, type, base);
        attr['ice_dfs_max'] += add_max;
        return {
            text: `最大冰防+${add_max}`,
            value: add_max,
            attr
        };
    },
    ice_dfs_min: function (value, attr, type, base) {
        const add_min = this.getValue('ice_dfs_min', value, type, base);
        attr['ice_dfs_min'] += add_min;
        return {
            text: `最小冰防+${add_min}`,
            value: add_min,
            attr
        };
    },
    // 雷元素
    mine_atk: function (value, attr, type, base) {
        const add_max = this.getValue(' mine_atk_max', value, type, base);
        const add_min = this.getValue(' mine_atk_min', value, type, base);
        attr[' mine_atk_max'] += add_max;
        attr[' mine_atk_min'] += add_min;
        return {
            text: `最小雷攻+${add_min},最大雷攻+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    mine_atk_max: function (value, attr) {
        const add_max = this.getValue(' mine_atk_max', value, type, base);
        attr[' mine_atk_max'] += add_max;
        return {
            text: `最大雷攻+${add_max}`,
            value: add_max,
            attr
        };
    },
    mine_atk_min: function (value, attr, type, base) {
        const add_min = this.getValue(' mine_atk_min', value, type, base);
        attr[' mine_atk_min'] += add_min;
        return {
            text: `最小雷攻+${add_min}`,
            value: add_min,
            attr
        };
    },
    mine_dfs: function (value, attr, type, base) {
        const add_max = this.getValue(' mine_dfs_max', value, type, base);
        const add_min = this.getValue(' mine_dfs_min', value, type, base);
        attr[' mine_dfs_max'] += add_max;
        attr[' mine_dfs_min'] += add_min;
        return {
            text: `最小雷防+${add_min},最大雷防+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    mine_dfs_max: function (value, attr) {
        const add_max = this.getValue(' mine_dfs_max', value, type, base);
        attr[' mine_dfs_max'] += add_max;
        return {
            text: `最大雷防+${add_max}`,
            value: add_max,
            attr
        };
    },
    mine_dfs_min: function (value, attr, type, base) {
        const add_min = this.getValue(' mine_dfs_min', value, type, base);
        attr[' mine_dfs_min'] += add_min;
        return {
            text: `最小雷防+${add_min}`,
            value: add_min,
            attr
        };
    },
    // 风元素
    wind_atk: function (value, attr, type, base) {
        const add_max = this.getValue('wind_atk_max', value, type, base);
        const add_min = this.getValue('wind_atk_min', value, type, base);
        attr['wind_atk_max'] += add_max;
        attr['wind_atk_min'] += add_min;
        return {
            text: `最小风攻+${add_min},最大风攻+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    wind_atk_max: function (value, attr) {
        const add_max = this.getValue('wind_atk_max', value, type, base);
        attr['wind_atk_max'] += add_max;
        return {
            text: `最大风攻+${add_max}`,
            value: add_max,
            attr
        };
    },
    wind_atk_min: function (value, attr, type, base) {
        const add_min = this.getValue('wind_atk_min', value, type, base);
        attr['wind_atk_min'] += add_min;
        return {
            text: `最小风攻+${add_min}`,
            value: add_min,
            attr
        };
    },
    wind_dfs: function (value, attr, type, base) {
        const add_max = this.getValue('wind_dfs_max', value, type, base);
        const add_min = this.getValue('wind_dfs_min', value, type, base);
        attr['wind_dfs_max'] += add_max;
        attr['wind_dfs_min'] += add_min;
        return {
            text: `最小风防+${add_min},最大风防+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    wind_dfs_max: function (value, attr) {
        const add_max = this.getValue('wind_dfs_max', value, type, base);
        attr['wind_dfs_max'] += add_max;
        return {
            text: `最大风防+${add_max}`,
            value: add_max,
            attr
        };
    },
    wind_dfs_min: function (value, attr, type, base) {
        const add_min = this.getValue('wind_dfs_min', value, type, base);
        attr['wind_dfs_min'] += add_min;
        return {
            text: `最小风防+${add_min}`,
            value: add_min,
            attr
        };
    },
    // 水元素
    water_atk: function (value, attr, type, base) {
        const add_max = this.getValue('water_atk_max', value, type, base);
        const add_min = this.getValue('water_atk_min', value, type, base);
        attr['water_atk_max'] += add_max;
        attr['water_atk_min'] += add_min;
        return {
            text: `最小水攻+${add_min},最大水攻+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    water_atk_max: function (value, attr) {
        const add_max = this.getValue('water_atk_max', value, type, base);
        attr['water_atk_max'] += add_max;
        return {
            text: `最大水攻+${add_max}`,
            value: add_max,
            attr
        };
    },
    water_atk_min: function (value, attr, type, base) {
        const add_min = this.getValue('water_atk_min', value, type, base);
        attr['water_atk_min'] += add_min;
        return {
            text: `最小水攻+${add_min}`,
            value: add_min,
            attr
        };
    },
    water_dfs: function (value, attr, type, base) {
        const add_max = this.getValue('water_dfs_max', value, type, base);
        const add_min = this.getValue('water_dfs_min', value, type, base);
        attr['water_dfs_max'] += add_max;
        attr['water_dfs_min'] += add_min;
        return {
            text: `最小水防+${add_min},最大水防+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    water_dfs_max: function (value, attr) {
        const add_max = this.getValue('water_dfs_max', value, type, base);
        attr['water_dfs_max'] += add_max;
        return {
            text: `最大水防+${add_max}`,
            value: add_max,
            attr
        };
    },
    water_dfs_min: function (value, attr, type, base) {
        const add_min = this.getValue('water_dfs_min', value, type, base);
        attr['wind_dfs_min'] += add_min;
        return {
            text: `最小水防+${add_min}`,
            value: add_min,
            attr
        };
    },
    // 火元素
    fire_atk: function (value, attr, type, base) {
        const add_max = this.getValue('fire_atk_max', value, type, base);
        const add_min = this.getValue('fire_atk_min', value, type, base);
        attr['fire_atk_max'] += add_max;
        attr['fire_atk_min'] += add_min;
        return {
            text: `最小火攻+${add_min},最大火攻+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    fire_atk_max: function (value, attr) {
        const add_max = this.getValue('fire_atk_max', value, type, base);
        attr['fire_atk_max'] += add_max;
        return {
            text: `最大火攻+${add_max}`,
            value: add_max,
            attr
        };
    },
    fire_atk_min: function (value, attr, type, base) {
        const add_min = this.getValue('fire_atk_min', value, type, base);
        attr['fire_atk_min'] += add_min;
        return {
            text: `最小火攻+${add_min}`,
            value: add_min,
            attr
        };
    },
    fire_dfs: function (value, attr, type, base) {
        const add_max = this.getValue('fire_dfs_max', value, type, base);
        const add_min = this.getValue('fire_dfs_min', value, type, base);
        attr['fire_dfs_max'] += add_max;
        attr['fire_dfs_min'] += add_min;
        return {
            text: `最小火防+${add_min},最大火防+${add_max}`,
            value: [add_min, add_max],
            attr
        };
    },
    fire_dfs_max: function (value, attr) {
        const add_max = this.getValue('fire_dfs_max', value, type, base);
        attr['fire_dfs_max'] += add_max;
        return {
            text: `最大火防+${add_max}`,
            value: add_max,
            attr
        };
    },
    fire_dfs_min: function (value, attr, type, base) {
        const add_min = this.getValue('fire_dfs_min', value, type, base);
        attr['wind_dfs_min'] += add_min;
        return {
            text: `最小火防+${add_min}`,
            value: add_min,
            attr
        };
    },
    // 世界声望
    world: function (value, attr) {
        attr['world'] = attr['world'] ? attr['world'] + value : value;
        return {
            text: `世界声望+${value}`,
            value: value,
            attr
        };
    },
    // 帮会声望
    gang: function (value, attr) {
        attr['gang'] = attr['gang'] ? attr['gang'] + value : value;
        return {
            text: `帮会声望+${value}`,
            value: value,
            attr
        };
    },
    // 结义声望
    intersect: function (value, attr) {
        attr['intersect'] = attr['intersect'] ? attr['intersect'] + value : value;
        return {
            text: `结义声望+${value}`,
            value: value,
            attr
        };
    },
    // 世界功勋
    exploit: function (value, attr) {
        attr['exploit'] = attr['exploit'] ? attr['exploit'] + value : value;
        return {
            text: `世界功勋+${value}`,
            value: value,
            attr
        };
    },
    // 世界名气
    fame: function (value, attr) {
        attr['fame'] = attr['fame'] ? attr['fame'] + value : value;
        return {
            text: `世界名气+${value}`,
            value: value,
            attr
        };
    },
}
