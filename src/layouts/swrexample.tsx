import {useFetch} from '@/customHooks/useSwr'

const Example = () => {
    const { data, error, loading } = useFetch({ url: '/chats', payload: { prompt: 'hello' }})
    console.log(data)
}

export default Example