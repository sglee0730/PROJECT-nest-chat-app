import { atom } from 'recoil';

export const GlobalUserState = atom({
    key: 'GlobalUserState',
    default: {
        username: 'none',
        email: 'none',
    }
})
