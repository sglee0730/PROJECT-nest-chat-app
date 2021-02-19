import { atom } from 'recoil';

export const messageState = atom({
    key: 'MESSAGE_STATE',
    default: {
        ReactJS: [],
        NestJS: [],
        NodeJS: [],
        Typescript: [],
        MySQL: [],
        Neo4j: [],
        Redis: [],
        ElasticSearch: [],
        Docker: [],
        Kubernetes: [],
        AWS: []
    }
});

export const roomState = atom({
    key: 'ROOM_STATE',
    default: 'ReactJS'
})