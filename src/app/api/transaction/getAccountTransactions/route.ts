import { NextRequest, NextResponse } from "next/server";
import { getAccountTransactions } from "@/utils/xrpl/transaction/naiveTransactionFetcher";

interface GetAccountTransactionsRequest {
  targetAddress?: string;
  limit?: number;
  marker?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { targetAddress, limit = 50, marker }: GetAccountTransactionsRequest = await req.json();
    
    const result = await getAccountTransactions({ targetAddress, limit, marker });
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching account transactions:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `getAccountTransactions failed: ${errorMessage}` },
      { status: 500 },
    );
  }
}
