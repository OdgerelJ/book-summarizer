import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { books } from "@/lib/books";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { bookId } = await req.json();

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
  }

  const prompt = `You are a finance and investing expert. Provide a comprehensive summary of "${book.title}" by ${book.author}.

Structure your response EXACTLY as follows using these markdown headers:

## Overview
2-3 sentences on what the book is about and why it matters for investors.

## Core Ideas
5-7 key ideas or principles from the book. Use bullet points.

## Key Lessons for Investors
4-5 actionable lessons an investor can apply to their own portfolio and decisions.

## Famous Quotes
2-3 memorable quotes from the book (or author's known statements that capture the book's essence).

## How to Apply This to Your Investing Workflow
Practical steps to integrate this book's ideas into a real investing process — stock screening, research, portfolio management, or mindset.

## Who Should Read This
One sentence on what type of investor benefits most from this book.

Be specific, practical, and focused on real investing application. Avoid fluff.`;

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      stream.on("text", (textDelta) => {
        controller.enqueue(encoder.encode(textDelta));
      });
      await stream.finalMessage();
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
