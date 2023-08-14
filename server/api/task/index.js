const { RoleG } = require('../../global')


router.post("/getTaskList", (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const task = Global.taskLoop[role_id];
    const taskList = Object.keys(task).map(key => {
        return {
            text: `${TASK_MEUN[key]}(${task[key].length})`,
            type: key
        }
    })
    res.send({
        code: 0,
        data: taskList
    })
});
