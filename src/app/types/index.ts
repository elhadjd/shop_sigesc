import { Product } from "./products";

export interface ItemInvoice {
    id: number
    invoice_id: number;
    produtos_id: number;
    armagen_id: number;
    quantity: number;
    PriceCost: number;
    PriceSold: number;
    Discount: number;
    tax: number;
    totalTax: number;
    TotalDiscount: number;
    final_price: number;
    TotalCost: number;
    TotalSold: number;
    produto: Product
  }
  
  export interface TypeInvoice {
  id: number;
  orderNumber: string;
  company_id: number;
  user_id: number;
  cliente_id: number;
  TotalInvoice: number;
  discount: number;
  TotalMerchandise: number;
  tax: number;
  state: string;
  DateOrder: string;
  DateDue: string;
  RestPayable: number;
  invoice_items: ItemInvoice[]
}
