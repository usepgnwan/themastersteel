let {hbar, wbar} = useSideBarData()
export function hideSidebar(){
    if(!hbar.value){
        wbar.value = '5rem'
    }else{
        wbar.value = '16rem'
    }  

    hbar.value=!hbar.value 
}


export function debounceValue<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}