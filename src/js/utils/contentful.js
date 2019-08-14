import api from "./api"

export const createEntry = (entryName, data) => {
    api.then(env => {
        env
            .createEntry(entryName, {
                fields: {
                    ...data
                }
            })
            .then(res => {
                api.then(env => {
                    env.getEntry(res.sys.id).then(entry => {
                        entry.publish()
                    })
                })
                console.log('reeeees', res.sys.id)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

export const getEntry = (id) => {
    return new Promise(resolve => {
        api.then(env => {
            env.getEntry(id).then(entry => {
                resolve(entry);
            })
        })
    })
}

export const getEntries = (contentType) => {
    return new Promise(resolve => {
        api.then(env => {
            env.getEntries({ content_type: contentType })
                .then(entries => {
                    resolve(entries);
                })
        })
    })
}