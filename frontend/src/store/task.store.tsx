import { atom } from 'recoil';

export const taskState = atom({
    key: 'TASK_STATE',
    default: []
})