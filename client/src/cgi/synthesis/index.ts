import { post } from "@request";
const gatherUrl = "/synthesis/gather";


// 采集天材地宝
export function gather() {
    return post(gatherUrl);
}
