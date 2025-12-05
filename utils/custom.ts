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

export async function getCart(id:number){
     
      let data = {
          table : 'cart',
          type_table : 'main', 
          user_id :  id
      }
      interface DataResponse<T> {
        code: number
        data: T[]
      }

      let rowData = ref<DataResponse<{}>>({
        code: 0,
        data: []
      })
      try{ 
          let d = await useServerApi({action:"GET",url:'/api/dd/get/data', payload:data})
  
          if(d.status !== 200){
              rowData.value = {
                code : 500,
                data : []
              }
          } 
          let r = d.data.data;  
          rowData.value = {
            code : 200,
            data : r
          }
          return rowData
      }catch(e){ 
          rowData.value = {
            code : 500,
            data : []
          }
          return rowData
      }
    }