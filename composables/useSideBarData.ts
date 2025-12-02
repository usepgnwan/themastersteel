export const useSideBarData = () => {
    if (process.server) return { hbar: ref(false), wbar: ref('16rem'), title_header : ref<String>('home') }

    const hbar = useState('close', () => false)
    const wbar = useState('wbar', () => '16rem')
    const title_header = useState('title_header', ()=> 'home')
    return { hbar, wbar,title_header }
}