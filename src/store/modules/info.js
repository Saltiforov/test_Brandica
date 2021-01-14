export default {
    state: {
        info:
            {
                icon: 'https://cdn.pixabay.com/photo/2020/12/09/09/00/circle-5816819_960_720.jpg',
                name: 'Michail',
                email: 'admin@gmail.admin',
                phone: '0782482345',
                info: 'Frond-end developer.   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda at aut consectetur, consequatur consequuntur, eligendi error, explicabo illo iste itaque iure nam officia perspiciatis quibusdam quos rerum suscipit veniam!',
                editing: false
            }
    },
    getters: {
        getInfo(state) {
            return state.info
        }
    },
    mutations: {
        setEditing(state, payload) {
            return state.info.editing = payload
        },
        saveChange(state, payload) {
            for (let item in state.info) {
                state.info[item] = payload[item];
            }
            localStorage.setItem('info', JSON.stringify(state.info))
        },
    },
}

