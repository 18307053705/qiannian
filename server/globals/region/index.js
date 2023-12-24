function getRegionNum(req) {
    return req.cookies["region"];
}


global.RegionG = {
    getRegionNum
}