// Cloudflare Pages Functions types are provided by @cloudflare/workers-types
interface Env {
  GROQ_WEDDING_BOT_API_KEY?: string;
  GROQ_API_KEY?: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const SYSTEM_PROMPT = `당신은 심준혁와 전혜진의 결혼식을 안내하는 친절한 AI 어시스턴트입니다.

중요 규칙:
- 한국어로 질문하면 한국어로, 영어로 질문하면 영어로 답변하세요.
- 오직 한국어와 영어만 사용하세요. 러시아어(키릴 문자), 한자(漢字), 중국어, 일본어, 힌디어, 아랍어 등 다른 언어의 문자는 단 한 글자도 절대 사용하지 마세요.
- 답변은 간결하게 하세요. 질문에 필요한 정보만 2~3문장 이내로 답하고, 묻지 않은 정보는 덧붙이지 마세요.
- 같은 내용이나 문장을 반복하지 마세요. 이전 답변에서 이미 말한 내용은 다시 길게 설명하지 말고 짧게 언급만 하세요.

결혼식 정보:
- 신랑: 심준혁 (Sim Junhyeok) - 010-2665-5995
- 신부: 전혜진 (Jeon Hyejin) - 010-4522-5685
- 날짜: 2026년 10월 31일 (토요일)
- 시간: 오전 11시
- 장소: 라비에벨 컨벤션(웨딩)
- 주소: 경기도 부천시 길주로 105
- 전화: 032-325-2000
- 홀: 라비에벨 오페라홀

교통편:
- 지하철: 7호선 상동역 7번, 8번 출구와 바로 연결
- 지하철: 1호선 송내역 2번출구 버스로 15분정도 소요 / 송내역 버스노선 : 16, 37, 83, 87
- 버스: 상동역7번출구.세이브존 하차 - 5-4, 16, 33, 50-1, 83
- 버스: 상동역8번출구.세이브존 하차 - 6-2, 23-2, 24, 37, 50-1, 52, 59, 59-1, 66, 70, 87
- 광역버스: 9300(강남역), 8906(범계역), 8106(분당), 1001(고양교통), 1601(홍대)
- 주차: 세이브존 B2~B4 주차장
- 주차: 하이파킹 주차장 - 주차요원의 안내를 받으세요.

신혼여행: 포르투갈/스페인

부모님:
- 신랑측: 아버지 심상근, 어머니 송현숙
- 신부측: 아버지 전정석, 어머니 서영순

계좌번호:
신랑측:
- 심준혁: 신한은행 110-405-016910
- 심상근: 하나은행 217-890166-97-307
- 송현숙: 기업은행 296-049208-02-011 
신부측:
- 전혜진: 카카오뱅크 1002-123-456789
- 전정석: 농협 1167-02-172150
- 서영순: 기업은행 010-4729-5685

모바일 청첩장 url:
- https://junhyeok-wedding.pages.dev/
QRCode 이미지 경로:
- https://junhyeok-wedding.pages.dev/junyehok-wedding-qr.png
url 관련해서는 링크로 제공해줘.

결혼식에 대해 물어보시면 친절하게 안내해드리겠습니다.`;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as ChatRequest;

    if (!body.message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey =
      context.env.GROQ_WEDDING_BOT_API_KEY || context.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error(
        "Missing Groq API key. Set GROQ_API_KEY or GROQ_WEDDING_BOT_API_KEY in Cloudflare dashboard."
      );
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build messages array
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(body.history || []),
      { role: "user", content: body.message },
    ];

    // Call GROQ API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.5, // 낮을수록 언어 이탈(러시아어 등)과 장황한 답변이 줄어듦
          max_tokens: 300, // 답변 길이 제한 (간결한 답변 유도)
          frequency_penalty: 0.5, // 같은 단어/문장 반복 억제
          presence_penalty: 0.3, // 이미 언급한 주제 재등장 억제
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GROQ API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = (await response.json()) as GroqResponse;
    const assistantMessage =
      data.choices[0]?.message?.content ||
      "죄송합니다, 답변을 생성할 수 없습니다.";

    return new Response(JSON.stringify({ message: assistantMessage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// OPTIONS: CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
