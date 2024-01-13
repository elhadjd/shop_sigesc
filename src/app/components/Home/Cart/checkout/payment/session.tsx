import { ItemInvoice, TypeInvoice } from "@/app/types";
import { ClientTypeScript } from "@/app/types/client";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const host = "http://localhost:3000/checkout/payment";

let message = '';
let loading = false

const createStripeSession = async (client:ClientTypeScript, order:TypeInvoice) => {
    
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      customer_email: client.email,
      payment_method_types: ['card'],
      line_items: order.invoice_items.map((item: ItemInvoice) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.produto.nome,
            description: item.produto.description,
            images: [`https://geral.sisgesc.net/produtos/image/${item.produto.image}`],
          },
          unit_amount: Math.ceil(item.TotalSold * 50),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      return_url: `${host}/success/${order.orderNumber}`,
      metadata:{
        orderId: order.id
      }
    });
    return {
      sessionId: session.id,
      clientSecret: session.client_secret
    };
  } catch (err) {
    message = "Erro ao processar pagamento por favor tente novamente mais tard"
    console.error('Erro ao processar pagamento:', err);
    throw err;
  }
};

const CheckoutSession = ({ client, order }:{client: ClientTypeScript,order: TypeInvoice}) => {
  const handlePaymentClick = async () => {
    loading = true
    try {
      const {clientSecret,sessionId} = await createStripeSession(client, order);
      localStorage.setItem('checkoutSession',sessionId)
      window.location.href = `/checkout/session/${clientSecret}`;
    } catch (err) {
      message = "Erro ao processar pagamento por favor tente novamente mais tard"
      console.error('Erro ao processar pagamento:', err);
    }
  };

  return (
    <div>
      <button
        onClick={handlePaymentClick} 
        type="button"
        style={{
          padding: '5px 20px',
          backgroundColor: '#00a5cf',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: 0.8,
        }}
      >{message != '' ? message: 'Pagar'}</button>
    </div>
  );
};

export default CheckoutSession;
