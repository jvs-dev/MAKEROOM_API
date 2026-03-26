import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'APP_USR-5759807561711985-082700-d646978e83b51b826768cadb8c7a4ae3-1945286731';

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
const payment = new Payment(client);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await payment.create({ body });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API] Payment Error:', error?.message || String(error));
    return NextResponse.json(
      { error: error?.message || 'Erro ao processar pagamento', status: error?.status || 400 },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}