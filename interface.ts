export interface itemMenu { 
    label: string;
    icon?: string;
    class?: string;
    to?: string;
    parent_to?: string;
    active?: boolean;
    defaultOpen? : boolean;
    children?: {
                label: string;
                description?: string;
                class?: string;
                to?: string;
                active?: boolean;
            }[] | null 
}



interface rulesDataSelect {  
    label: string 
    value: string 
}
interface RuleItem {
  value: any
  rules?: string
  errors?: any
  id?: string
  name?: string
  type?:string
  deskripsi?:string
  label?:string
  data?:[rulesDataSelect],
  isDinamyc?: boolean,
  isFull?: boolean,
  hideDinamyc?: boolean,
  isPayload?: boolean,
  isDisabled: boolean
}

export interface RulesDataForm {
  [key: string]: RuleItem
}

export interface BusinesCategoryForm{
  description?:string
  name?:string
}

export interface SubBusinesCategoryForm{
  description?:string
  name?:string
  business_category_id?:number
}

export interface VariantParameterForm{
  type_data?:string
  name?:string
  business_category_id?:number
}