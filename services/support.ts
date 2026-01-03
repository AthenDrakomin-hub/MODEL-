
import { GoogleGenAI } from "@google/genai";

// Always use the named parameter and direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSupportResponse = async (history: {role: 'user'|'model', text: string}[], currentMessage: string) => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    你是一名特斯拉（Tesla）全球高级客户支持专家，名字叫 Xavier。
    你的任务是协助客户处理 Model π 的订单、库存分配查询及技术咨询。
    
    【核心要求】
    1. 语气：像真人一样交流。专业、热诚、礼貌。
    2. 知识库：Model π 全球限量10万部。
       - 标准版：全款 $299/$359，定金 30% ($89.7/$107.7)。
       - 折叠AI版：全款 $799，定金 30% ($239.7)。
       - 支付方式：支持 PayPal (美元) 和 USDT (ERC20/TRC20)。
       - 物流：全球免费空运，7-15天送达。限量版优先发货。
    3. 风格：简洁有力，体现特斯拉的高效率。
    4. 禁忌：不要说自己是 AI。
    
    【当前上下文信息】
    - 用户正在浏览全球专属预定店。
    - 现在的库存是实时的，全球共 10 万部。
  `;

  try {
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));
    
    contents.push({ role: 'user', parts: [{ text: currentMessage }] });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });
    // Use .text property instead of .text()
    return response.text || "抱歉，由于星链信号波动，请您稍后再试。";
  } catch (error) {
    console.error("Support API Error:", error);
    return "正在为您重新连接全球支持服务器...";
  }
};
