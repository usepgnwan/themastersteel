export const useGlobal = () => {
//   const { t, locale, setLocale } = useI18n();
  const toast = useToast();
  const router = useRouter(); //navigate page, add query or parameter, locate history route
  const route = useRoute(); //show value route, id, query, and parameter
  // const api = useClient();

  function capitalize(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  function showToast(title: string, type: 'primary' | 'success' | 'warning' | 'error', timeout?: number) {
    toast.clear();
    switch (type) {
      case 'primary':
        toast.add({
          title: capitalize(title),
          color: 'primary',
          icon: 'i-heroicons-check-badge',
          duration: timeout || 2000
        });
        break;
      case 'success':
        toast.add({
          title: capitalize(title),
          color: 'success',
          icon: 'i-heroicons-check-badge',
          duration: timeout || 2000
        });
        break;
      case 'warning':
        toast.add({
          title: capitalize(title),
          color: 'warning',
          icon: 'i-heroicons-hand-raised',
          duration: timeout || 2000
        });
        break;
      case 'error':
        toast.add({
          title: capitalize(title),
          color: 'error',
          icon: 'i-heroicons-no-symbol',
          duration: timeout || 2000
        });
        break;
      default:
        toast.add({
          title: capitalize(title),
          color: 'primary',
          icon: 'i-heroicons-check-badge',
          duration: timeout || 2000
        });
        break;
    }
  }

  
  const getDselect = async({table,type_table, limit,   id } : { table : string, type_table: string, limit:number  , id: number | null}   ) =>{
      try{ 
          let data = {action:"GET",url:'/api/dd/get/data/detail/'}

          
          let param = {
              table : table,
              type_table : type_table,
              page : 1,
              limit : limit,
              deskripsi : '',
          } 
          data.payload =  param;
          if(id != null) {
              delete param.page;
              delete param.limit;
              data.payload = { ...param } 
              data.url = data.url +   id
              
          }
  
          let d = await useServerApi(data)
          if(d.status !== 200){
              return showToast("Terjadi kesalahan", "error")
          } 
        
          let r = d.data.data;  
    

          let rows = [];
          Object.entries(r).forEach(([i,v])=>{ 
              console.log(v)
              rows.push({
                  label: v.name,
                  value: v.code,
              })
          })
        
        // row_data.value[column].data = rows; 
        return rows;
      }catch(e){
          showToast("Terjadi kesalahan", "error") 
          return  []
      }
  }

  function getRangeDate({ mode = "bulan", days = 7 } = {}) {
    const now = new Date();
    let start;

    if (mode === "hari") {
      start = new Date();
      start.setDate(now.getDate() - (days - 1)); // mundur sesuai jumlah hari
    } else {
      // default bulan ini
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const formatter = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    let dates = [];
    let cursor = new Date(start);

    while (cursor <= now) {
      dates.push(formatter.format(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    return dates;
  }

  
  function throwTo404(){
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
    })
  }
  const toRupiah = (n: number) => {
    return new Intl.NumberFormat('id-ID').format(n);
  };

  const formatDate = (date: string) => {
    const d = new Date(date);

    return d.toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  });
  };
  return {
    // t,
    // locale,
    // setLocale,
    showToast,
    router,
    route,
    getDselect,
    getRangeDate,
    throwTo404,
    toRupiah,
    formatDate
    // api
  };
};
