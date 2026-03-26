import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// O Vercel vai injetar essa variável de ambiente
const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'APP_USR-5759807561711985-082700-d646978e83b51b826768cadb8c7a4ae3-1945286731';

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
const payment = new Payment(client);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { value, items, payerEmail } = body;
    
    const paymentData = {
      body: {
        transaction_amount: value,
        description: items,
        payment_method_id: 'pix',
        payer: {
          email: payerEmail,
        },
      },
    };
    
    const result = await payment.create(paymentData);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API] Pix Error:', error?.message || String(error));
    return NextResponse.json(
      { error: error?.message || 'Erro ao gerar Pix', status: error?.status || 400 },
      { status: 400 }
    );
  }
}

// Necessário para o CORS funcionar corretamente no preflight (OPTIONS)
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}