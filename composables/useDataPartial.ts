export const useDataPartial = () => { 
    let loading = useState('loading',() => ref<Boolean>(true));
    return { loading }
}